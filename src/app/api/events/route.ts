import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("event_capacity")
      .select("*")
      .in("status", ["upcoming", "active"])
      .order("date", { ascending: true });

    if (error) {
      console.error("Events fetch error:", error);
      return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }

    return NextResponse.json({ events: data || [] });
  } catch {
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
