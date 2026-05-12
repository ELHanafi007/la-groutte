import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { qr_token } = await req.json();

    if (!qr_token) {
      return NextResponse.json(
        { result: "not_found", message: "QR code invalide." },
        { status: 400 }
      );
    }

    // Find reservation by QR token
    const { data: reservation, error } = await supabase
      .from("reservations")
      .select("*, events(*)")
      .eq("qr_token", qr_token)
      .single();

    if (error || !reservation) {
      // Log failed scan
      await supabase.from("scan_logs").insert({
        qr_token,
        result: "not_found",
      });

      return NextResponse.json({
        result: "not_found",
        message: "QR code non reconnu. Réservation introuvable.",
      });
    }

    // Check if already checked in
    if (reservation.status === "checked_in") {
      await supabase.from("scan_logs").insert({
        reservation_id: reservation.id,
        qr_token,
        result: "already_used",
      });

      return NextResponse.json({
        result: "already_used",
        message: "Ce QR code a déjà été utilisé.",
        reservation: {
          name: reservation.name,
          checked_in_at: reservation.checked_in_at,
        },
      });
    }

    // Check if cancelled
    if (reservation.status === "cancelled") {
      await supabase.from("scan_logs").insert({
        reservation_id: reservation.id,
        qr_token,
        result: "cancelled",
      });

      return NextResponse.json({
        result: "cancelled",
        message: "Cette réservation a été annulée.",
        reservation: { name: reservation.name },
      });
    }

    // Check if event date has passed (expired)
    const eventDate = new Date(reservation.events.date);
    const now = new Date();
    // Allow check-in until 10 AM the day after the event
    const expiryDate = new Date(eventDate);
    expiryDate.setDate(expiryDate.getDate() + 1);
    expiryDate.setHours(10, 0, 0, 0);

    if (now > expiryDate) {
      await supabase
        .from("reservations")
        .update({ status: "expired" })
        .eq("id", reservation.id);

      await supabase.from("scan_logs").insert({
        reservation_id: reservation.id,
        qr_token,
        result: "expired",
      });

      return NextResponse.json({
        result: "expired",
        message: "Ce QR code a expiré.",
        reservation: { name: reservation.name },
      });
    }

    // ✅ SUCCESS — Mark as checked in
    const checked_in_at = new Date().toISOString();

    await supabase
      .from("reservations")
      .update({ status: "checked_in", checked_in_at })
      .eq("id", reservation.id);

    await supabase.from("scan_logs").insert({
      reservation_id: reservation.id,
      qr_token,
      result: "success",
    });

    return NextResponse.json({
      result: "success",
      message: "Accès confirmé !",
      reservation: {
        name: reservation.name,
        party_size: reservation.party_size,
        table_preference: reservation.table_preference,
        event_title: reservation.events.title,
        checked_in_at,
      },
    });
  } catch {
    return NextResponse.json(
      { result: "not_found", message: "Erreur interne." },
      { status: 500 }
    );
  }
}
