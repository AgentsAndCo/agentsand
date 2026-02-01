import { sql } from "../app/lib/db";

async function setup() {
  await sql`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      llc_name TEXT NOT NULL,
      state VARCHAR(2) NOT NULL,
      email TEXT NOT NULL,
      product TEXT NOT NULL DEFAULT 'reservation',
      stripe_session_id TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_reservations_name_state ON reservations(lower(llc_name), state)
  `;

  console.log("Database setup complete.");
}

setup().catch(console.error);
