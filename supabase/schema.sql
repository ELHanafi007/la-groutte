-- ===================================================
-- LA GROTTE DU PÊCHEUR — Database Schema
-- Run this in your Supabase SQL Editor
-- ===================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================================
-- EVENTS TABLE
-- ===================================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('regular', 'dj_party', 'live_band', 'ladies_night', 'private')),
  date DATE NOT NULL,
  doors_open TIME NOT NULL DEFAULT '22:00',
  doors_close TIME NOT NULL DEFAULT '04:00',
  capacity INTEGER NOT NULL DEFAULT 200,
  description TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================================
-- RESERVATIONS TABLE
-- ===================================================
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  party_size INTEGER NOT NULL DEFAULT 1 CHECK (party_size >= 1 AND party_size <= 20),
  table_preference TEXT DEFAULT 'any' CHECK (table_preference IN ('any', 'bar', 'terrace', 'vip', 'inside')),
  qr_token TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'cancelled', 'no_show', 'expired')),
  checked_in_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================================
-- SCAN LOGS TABLE
-- ===================================================
CREATE TABLE scan_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  qr_token TEXT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('success', 'already_used', 'expired', 'not_found', 'cancelled')),
  scanned_by TEXT,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================================
-- ADMIN USERS TABLE
-- ===================================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'doorman' CHECK (role IN ('owner', 'manager', 'doorman')),
  pin_code TEXT, -- Simple PIN for doorman scanner auth
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===================================================
-- INDEXES
-- ===================================================
CREATE INDEX idx_reservations_event_id ON reservations(event_id);
CREATE INDEX idx_reservations_qr_token ON reservations(qr_token);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_email ON reservations(email);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_scan_logs_reservation_id ON scan_logs(reservation_id);

-- ===================================================
-- VIEWS
-- ===================================================

-- Event with current check-in count
CREATE OR REPLACE VIEW event_capacity AS
SELECT
  e.id,
  e.title,
  e.type,
  e.date,
  e.capacity,
  e.status,
  COUNT(r.id) FILTER (WHERE r.status = 'confirmed') AS reserved_count,
  COUNT(r.id) FILTER (WHERE r.status = 'checked_in') AS checked_in_count,
  e.capacity - COUNT(r.id) FILTER (WHERE r.status IN ('confirmed', 'checked_in')) AS spots_remaining
FROM events e
LEFT JOIN reservations r ON r.event_id = e.id
GROUP BY e.id;

-- ===================================================
-- ROW LEVEL SECURITY
-- ===================================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public can read upcoming events
CREATE POLICY "Public can view upcoming events"
  ON events FOR SELECT
  USING (status IN ('upcoming', 'active'));

-- Public can create reservations
CREATE POLICY "Public can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

-- Public can read their own reservation by qr_token
CREATE POLICY "Public can view reservation by token"
  ON reservations FOR SELECT
  USING (true);

-- Service role can do everything (for API routes)
-- Note: Supabase service role bypasses RLS by default

-- ===================================================
-- SEED DATA — Sample Events
-- ===================================================
INSERT INTO events (title, type, date, doors_open, capacity, description) VALUES
  ('Old School Beats', 'dj_party', CURRENT_DATE + INTERVAL '3 days', '22:00', 200, 'Une soirée Old School inoubliable avec les meilleurs classiques.'),
  ('Live Band Night', 'live_band', CURRENT_DATE + INTERVAL '4 days', '21:00', 150, 'Musique live avec des artistes talentueux dans une ambiance unique.'),
  ('Ladies Night Special', 'ladies_night', CURRENT_DATE + INTERVAL '10 days', '22:00', 200, 'Soirée spéciale Ladies Night — entrée gratuite pour les femmes.');
