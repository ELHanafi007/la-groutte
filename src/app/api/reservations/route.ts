import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";
import type { ReservationFormData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: ReservationFormData = await req.json();
    const { name, email, phone, party_size, table_preference, event_id } = body;

    // Validate required fields
    if (!name || !email || !phone || !event_id) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    if (party_size < 1 || party_size > 20) {
      return NextResponse.json(
        { error: "Le nombre de personnes doit être entre 1 et 20." },
        { status: 400 }
      );
    }

    // --- DEMO MODE CHECK ---
    const isDemo = 
      process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("your-project") || 
      !process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (isDemo) {
      const qr_token = `LG-DEMO-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
      return NextResponse.json({
        success: true,
        reservation: {
          id: crypto.randomUUID(),
          qr_token,
          name: name.trim(),
          party_size,
          table_preference: table_preference || "any",
          status: "confirmed",
        },
      });
    }

    // Check event exists and has capacity
    const { data: event, error: eventError } = await supabase
      .from("event_capacity")
      .select("*")
      .eq("id", event_id)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: "Événement introuvable." },
        { status: 404 }
      );
    }

    if (event.spots_remaining < party_size) {
      return NextResponse.json(
        { error: "Désolé, il n'y a plus assez de places pour cet événement." },
        { status: 409 }
      );
    }

    // Generate unique QR token — cryptographic, impossible to guess
    const qr_token = `LG-${crypto.randomBytes(16).toString("hex").toUpperCase()}`;

    // Create reservation
    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .insert({
        event_id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        party_size,
        table_preference: table_preference || "any",
        qr_token,
        status: "confirmed",
      })
      .select()
      .single();

    if (reservationError) {
      console.error("Reservation error:", reservationError);
      return NextResponse.json(
        { error: "Erreur lors de la création de la réservation." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        qr_token: reservation.qr_token,
        name: reservation.name,
        party_size: reservation.party_size,
        table_preference: reservation.table_preference,
        status: reservation.status,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
