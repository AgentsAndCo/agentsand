import { neon } from "@neondatabase/serverless";
import { nanoid } from "nanoid";

function getSql() {
  if (!process.env.DATABASE_URL) return null;
  return neon(process.env.DATABASE_URL);
}

export function sql(...args: Parameters<ReturnType<typeof neon>>) {
  const client = getSql();
  if (!client) throw new Error("DATABASE_URL is not set");
  return client(...args);
}

export interface RegistrationRequest {
  id: string;
  agent_name: string | null;
  owner_email: string;
  llc_name: string;
  state: string;
  reason: string | null;
  status: string;
  created_at: string;
  expires_at: string;
}

export async function createRegistrationRequest(data: {
  agentName?: string;
  ownerEmail: string;
  llcName: string;
  state: string;
  reason?: string;
}): Promise<{ id: string }> {
  const id = nanoid(12);
  const client = getSql();
  if (!client) throw new Error("DATABASE_URL is not set");
  await client`
    INSERT INTO registration_requests (id, agent_name, owner_email, llc_name, state, reason)
    VALUES (${id}, ${data.agentName || null}, ${data.ownerEmail}, ${data.llcName}, ${data.state}, ${data.reason || null})
  `;
  return { id };
}

export async function getRegistrationRequest(id: string): Promise<RegistrationRequest | null> {
  const client = getSql();
  if (!client) return null;
  const result = await client`
    SELECT * FROM registration_requests WHERE id = ${id}
  `;
  if (result.length === 0) return null;
  return result[0] as RegistrationRequest;
}

export async function updateRegistrationRequestStatus(id: string, status: string): Promise<void> {
  const client = getSql();
  if (!client) return;
  await client`
    UPDATE registration_requests SET status = ${status} WHERE id = ${id}
  `;
}

export async function insertLead(email: string, llcName: string, state: string, available: boolean): Promise<void> {
  const client = getSql();
  if (!client) return;
  await client`
    INSERT INTO leads (email, llc_name, state, available)
    VALUES (${email}, ${llcName}, ${state}, ${available})
  `;
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
