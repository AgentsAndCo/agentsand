import { neon } from "@neondatabase/serverless";

function getSql() {
  if (!process.env.DATABASE_URL) return null;
  return neon(process.env.DATABASE_URL);
}

export function sql(...args: Parameters<ReturnType<typeof neon>>) {
  const client = getSql();
  if (!client) throw new Error("DATABASE_URL is not set");
  return client(...args);
}

export async function isNameReserved(name: string, state: string): Promise<boolean> {
  try {
    const client = getSql();
    if (!client) return false;
    const result = await client`
      SELECT COUNT(*) as count FROM reservations
      WHERE LOWER(llc_name) = LOWER(${name}) AND state = ${state}
    `;
    return Number(result[0].count) > 0;
  } catch {
    return false;
  }
}

/** Seed offset so counters are nonzero at launch. Set to 0 once real traffic exceeds it. */
export const SEED_COUNT = 147;

export async function getReservationCount(): Promise<number> {
  try {
    const client = getSql();
    if (!client) return SEED_COUNT;
    const result = await client`SELECT COUNT(*) as count FROM reservations`;
    return Number(result[0].count) + SEED_COUNT;
  } catch {
    return SEED_COUNT;
  }
}

export async function assignPosition(sessionId: string): Promise<number | null> {
  try {
    const client = getSql();
    if (!client) return null;
    const result = await client`
      UPDATE reservations
      SET position = (SELECT COUNT(*) FROM reservations) + ${SEED_COUNT}
      WHERE stripe_session_id = ${sessionId} AND position IS NULL
      RETURNING position
    `;
    if (result.length === 0) {
      const existing = await client`
        SELECT position FROM reservations WHERE stripe_session_id = ${sessionId}
      `;
      return existing.length > 0 ? Number(existing[0].position) : null;
    }
    return Number(result[0].position);
  } catch {
    return null;
  }
}

export async function getPositionBySessionId(sessionId: string): Promise<number | null> {
  try {
    const client = getSql();
    if (!client) return null;
    const result = await client`
      SELECT position FROM reservations
      WHERE stripe_session_id = ${sessionId}
    `;
    if (result.length === 0 || result[0].position == null) return null;
    return Number(result[0].position);
  } catch {
    return null;
  }
}

export async function processReferral(referrerEmail: string): Promise<number | null> {
  try {
    const client = getSql();
    if (!client) return null;
    const result = await client`
      UPDATE reservations
      SET position = GREATEST(position - 10, 1)
      WHERE email = ${referrerEmail} AND position IS NOT NULL
      RETURNING position
    `;
    if (result.length === 0) return null;
    return Number(result[0].position);
  } catch {
    return null;
  }
}
