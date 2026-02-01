const ADJECTIVES = [
  "Nexus",
  "Quantum",
  "Apex",
  "Nova",
  "Prism",
  "Cipher",
  "Atlas",
  "Vortex",
  "Zenith",
  "Helix",
  "Tensor",
  "Flux",
  "Axiom",
  "Vertex",
  "Vector",
  "Radiant",
  "Sentinel",
  "Ember",
  "Obsidian",
  "Cobalt",
  "Onyx",
  "Sterling",
  "Crimson",
  "Azure",
  "Meridian",
  "Phantom",
  "Titan",
  "Eclipse",
  "Polaris",
  "Catalyst",
];

const NOUNS = [
  "Dynamics",
  "Forge",
  "Labs",
  "Systems",
  "Ventures",
  "Works",
  "Logic",
  "Protocol",
  "Intelligence",
  "Networks",
  "Industries",
  "Technologies",
  "Computing",
  "Solutions",
  "Collective",
  "Assembly",
  "Circuit",
  "Machine",
  "Framework",
  "Engine",
  "Studio",
  "Signal",
  "Synapse",
  "Matrix",
  "Core",
];

export function generateLLCName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun} LLC`;
}

export function generateSuggestions(count: number = 3): string[] {
  const seen = new Set<string>();
  const suggestions: string[] = [];
  while (suggestions.length < count) {
    const name = generateLLCName();
    if (!seen.has(name)) {
      seen.add(name);
      suggestions.push(name);
    }
  }
  return suggestions;
}
