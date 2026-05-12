// ===================================================
// La Grotte du Pêcheur — Database Types
// Mirrors the Supabase schema
// ===================================================

export type EventType = "regular" | "dj_party" | "live_band" | "ladies_night" | "private";
export type EventStatus = "upcoming" | "active" | "completed" | "cancelled";
export type ReservationStatus = "pending" | "confirmed" | "checked_in" | "cancelled" | "no_show" | "expired";
export type ScanResult = "success" | "already_used" | "expired" | "not_found" | "cancelled";
export type TablePreference = "any" | "bar" | "terrace" | "vip" | "inside";
export type AdminRole = "owner" | "manager" | "doorman";

export interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  doors_open: string;
  doors_close: string;
  capacity: number;
  description: string | null;
  image_url: string | null;
  status: EventStatus;
  created_at: string;
  updated_at: string;
}

export interface EventWithCapacity extends Event {
  reserved_count: number;
  checked_in_count: number;
  spots_remaining: number;
}

export interface Reservation {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone: string;
  party_size: number;
  table_preference: TablePreference;
  qr_token: string;
  status: ReservationStatus;
  checked_in_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface ReservationWithEvent extends Reservation {
  event: Event;
}

export interface ScanLog {
  id: string;
  reservation_id: string | null;
  qr_token: string;
  result: ScanResult;
  scanned_by: string | null;
  scanned_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  pin_code: string | null;
  created_at: string;
}

// Form data types
export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  party_size: number;
  table_preference: TablePreference;
  event_id: string;
}

// Event type display config
export const EVENT_TYPE_CONFIG: Record<EventType, { label: string; color: "crimson" | "gold" }> = {
  regular: { label: "Soirée", color: "crimson" },
  dj_party: { label: "DJ Party", color: "crimson" },
  live_band: { label: "Live Band", color: "gold" },
  ladies_night: { label: "Ladies Night", color: "crimson" },
  private: { label: "Privé", color: "gold" },
};

export const TABLE_PREFERENCE_LABELS: Record<TablePreference, string> = {
  any: "Pas de préférence",
  bar: "Au bar",
  terrace: "Terrasse",
  vip: "VIP",
  inside: "Intérieur",
};
