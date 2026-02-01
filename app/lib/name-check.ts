import type { StateCode } from "./constants";

export interface NameCheckResult {
  available: boolean;
  matches: string[];
}

/**
 * Check LLC name availability via Cobalt Intelligence API.
 * Falls back to OpenCorporates if Cobalt key is not set.
 */
export async function checkNameAvailability(
  name: string,
  state: StateCode
): Promise<NameCheckResult> {
  if (process.env.COBALT_API_KEY) {
    return checkViaCobalt(name, state);
  }
  if (process.env.OPENCORPORATES_API_KEY) {
    return checkViaOpenCorporates(name, state);
  }
  // No API key configured — return optimistic result for development
  return { available: true, matches: [] };
}

async function checkViaCobalt(name: string, state: StateCode): Promise<NameCheckResult> {
  const res = await fetch("https://api.cobaltintelligence.com/v1/search-business", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COBALT_API_KEY}`,
    },
    body: JSON.stringify({ businessName: name, state }),
  });

  if (!res.ok) {
    console.error("Cobalt API error:", res.status, await res.text());
    return { available: true, matches: [] };
  }

  const data = await res.json();
  const matches: string[] = Array.isArray(data.results)
    ? data.results.map((r: { businessName?: string; name?: string }) => r.businessName || r.name || "")
    : [];

  return {
    available: matches.length === 0,
    matches,
  };
}

async function checkViaOpenCorporates(
  name: string,
  state: StateCode
): Promise<NameCheckResult> {
  const jurisdiction = `us_${state.toLowerCase()}`;
  const params = new URLSearchParams({
    q: name.replace(/ LLC$/i, ""),
    jurisdiction_code: jurisdiction,
    api_token: process.env.OPENCORPORATES_API_KEY!,
  });

  const res = await fetch(`https://api.opencorporates.com/v0.4/companies/search?${params}`);

  if (!res.ok) {
    console.error("OpenCorporates API error:", res.status);
    return { available: true, matches: [] };
  }

  const data = await res.json();
  const companies = data?.results?.companies || [];
  const matches: string[] = companies.map(
    (c: { company?: { name?: string } }) => c.company?.name || ""
  );

  // Exact or very close match means unavailable
  const normalizedInput = name.replace(/ LLC$/i, "").toLowerCase().trim();
  const hasExactMatch = matches.some(
    (m: string) => m.toLowerCase().trim().replace(/ llc$/i, "") === normalizedInput
  );

  return {
    available: !hasExactMatch,
    matches: matches.slice(0, 5),
  };
}
