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

  await sql`
    CREATE TABLE IF NOT EXISTS registration_requests (
      id TEXT PRIMARY KEY,
      agent_name TEXT,
      owner_email TEXT NOT NULL,
      llc_name TEXT NOT NULL,
      state VARCHAR(2) NOT NULL DEFAULT 'WY',
      reason TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '7 days'
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_reg_requests_email ON registration_requests(owner_email)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      llc_name TEXT NOT NULL,
      state VARCHAR(2) NOT NULL,
      available BOOLEAN,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)
  `;

  console.log("Database setup complete.");
}

setup().catch(console.error);
