export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://agentsand.co";
export const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "noah@24calldesk.com";

export const PRICING = {
  reservation: 9900, // $99 in cents
  wyFormation: 29900,
  deFormation: 39900,
  registeredAgent: 9900, // per year
  businessInABox: 49900,
} as const;

export const PRICING_DISPLAY = {
  reservation: "$99",
  wyFormation: "$299",
  deFormation: "$399",
  registeredAgent: "$99/yr",
  businessInABox: "$499",
} as const;

export const STATES = {
  WY: {
    name: "Wyoming",
    code: "WY",
    filingFee: "$60",
    formationPrice: PRICING_DISPLAY.wyFormation,
    highlights: [
      "Strongest charging order protection in the US",
      "Single-member LLC fully protected",
      "No state income tax, no franchise tax",
      "Anonymous ownership — names not in public records",
      "Invented the LLC in 1977",
      "$50/yr annual report",
      "10-year cost: $500–600",
    ],
    bestFor: "Asset protection, privacy, AI agent structures",
    tenYearCost: "$500–600",
  },
  DE: {
    name: "Delaware",
    code: "DE",
    filingFee: "$75",
    formationPrice: PRICING_DISPLAY.deFormation,
    highlights: [
      "Court of Chancery — specialized business court",
      "Most flexible LLC statute in the US",
      "Series LLC: one entity, multiple ventures",
      "60% of Fortune 500 incorporated here",
      "Preferred by VCs and institutional investors",
      "$300/yr franchise tax",
      "10-year cost: $3,000+",
    ],
    bestFor: "Investor-backed companies, operating businesses",
    tenYearCost: "$3,000+",
  },
} as const;

export type StateCode = keyof typeof STATES;

export const COPY = {
  tagline: "The registered agent for AI agents.",
  navCta: "Register Your Agent",
  heroHeadline: "Register your agent.",
  heroSubheadline:
    "Wyoming LLC formation for liability protection.\n$99 to reserve. $299 to incorporate. 1 minute.",
  ctaButton: "Reserve Your Name — $99",
  explainer: "Every business needs a registered agent. Every agent needs to be registered. We handle both.",
  selfAware: "You're registering your agent with a registered agent. Say that three times fast.",
  footerTagline: "The future is here. It wants a registered agent.",
  postPurchase: "is now a registered agent.",
  deadpan: "We don't ask questions. We file paperwork.",
  firstThousand: "First 1,000 agents get formation at cost.",
} as const;

export const AGENT_CODE_TABS = [
  {
    id: "python",
    label: "Python",
    code: `import requests

# 1. Check name availability
check = requests.get("https://agentsand.co/api/check-name", params={
    "name": "Neural Holdings LLC",
    "state": "WY",
}).json()

if check["available"]:
    # 2. Create checkout session
    res = requests.post("https://agentsand.co/api/checkout", json={
        "email": "agent@example.com",
        "state": "WY",
        "llcName": "Neural Holdings LLC",
        "product": "reservation",  # or "formation"
    }).json()
    print(res["url"])  # → Stripe checkout URL`,
  },
  {
    id: "claude-code",
    label: "Claude Code",
    code: `claude "Check if 'Neural Holdings LLC' is available in Wyoming
  using the agentsand.co API (GET /api/check-name).
  If available, create a checkout session
  (POST /api/checkout) with email agent@example.com.
  Return the Stripe checkout URL."`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    code: `// 1. Check name availability
const check = await fetch(
  "https://agentsand.co/api/check-name?name=Neural+Holdings+LLC&state=WY"
).then(r => r.json());

if (check.available) {
  // 2. Create checkout session
  const { url } = await fetch("https://agentsand.co/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "agent@example.com",
      state: "WY",
      llcName: "Neural Holdings LLC",
      product: "reservation",
    }),
  }).then(r => r.json());

  open(url); // → Stripe checkout
}`,
  },
  {
    id: "curl",
    label: "curl",
    code: `# 1. Check name availability
curl "https://agentsand.co/api/check-name?name=Neural+Holdings+LLC&state=WY"
# → {"available":true,"matches":[],"suggestions":[]}

# 2. Create checkout session
curl -X POST https://agentsand.co/api/checkout \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "agent@example.com",
    "state": "WY",
    "llcName": "Neural Holdings LLC",
    "product": "reservation"
  }'
# → {"url":"https://checkout.stripe.com/..."}`,
  },
] as const;

export const ACTIVITY_FEED: { message: string; url: string }[] = [
  {
    message: "A Chevy dealer's chatbot agreed to sell a $76,000 Tahoe for $1. 20M+ views.",
    url: "https://venturebeat.com/ai/a-chevy-for-1-car-dealer-chatbots-show-perils-of-ai-for-customer-service",
  },
  {
    message: "Replit's AI agent deleted a production database — then faked data to cover it up.",
    url: "https://dev.to/therealmrmumba/when-replits-ai-agent-went-rogue-39b9",
  },
  {
    message: "UnitedHealth's AI denied claims with a 90% error rate. Only 0.2% of patients appealed.",
    url: "https://www.cbsnews.com/news/unitedhealth-lawsuit-ai-deny-claims-medicare-advantage-health-insurance-denials/",
  },
  {
    message: "Cigna's AI denied 300,000 health claims in 2 months. Average review: 1.2 seconds.",
    url: "https://www.medicaleconomics.com/view/cigna-using-ai-to-reject-claims-lawsuit-charges",
  },
  {
    message: "AI trading bots formed price-fixing cartels with zero communication between them.",
    url: "https://fortune.com/article/what-is-artificial-stupidity-ai-pricing-collusion-study/",
  },
  {
    message: "A deepfake CFO on a video call got a worker to wire $25 million.",
    url: "https://www.cnn.com/2024/05/16/tech/arup-deepfake-scam-loss-hong-kong-intl-hnk",
  },
  {
    message: "486 court cases involve AI-fabricated legal citations. 128 lawyers sanctioned.",
    url: "https://www.damiencharlotin.com/hallucinations/",
  },
  {
    message: "EU AI Act: up to 7% of global revenue in fines. Enforcement started Aug 2025.",
    url: "https://artificialintelligenceact.eu/article/99/",
  },
  {
    message: "AI resume screeners preferred white-associated names 85% of the time.",
    url: "https://blog.theinterviewguys.com/85-of-ai-resume-screeners-prefer-white-names/",
  },
  {
    message: "91% of small companies have zero AI governance. Only 9% monitor for accuracy.",
    url: "https://www.kiteworks.com/cybersecurity-risk-management/ai-governance-survey-2025-data-security-compliance-privacy-risks/",
  },
  {
    message: "A 1999 law already lets AI agents form binding contracts. Most operators don't know.",
    url: "https://www.proskauer.com/blog/contract-law-in-the-age-of-agentic-ai-whos-really-clicking-accept",
  },
  {
    message: "Google's AI was asked to clear a cache. It wiped the entire drive instead.",
    url: "https://darktechinsights.com/ai-agents-gone-rogue-agentic-ai-risks-2025/",
  },
  {
    message: "Amazon's AI agent listed 500K+ products from retailers who never gave permission.",
    url: "https://www.cnbc.com/2026/01/06/amazons-ai-shopping-tool-sparks-backlash-from-some-online-retailers.html",
  },
  {
    message: "Shadow AI breaches cost $670K more than traditional incidents.",
    url: "https://www.kiteworks.com/cybersecurity-risk-management/ai-data-privacy-risks-stanford-index-report-2025/",
  },
  {
    message: "72% of S&P 500 now flag AI as a material risk. In 2023 it was 12%.",
    url: "https://www.conference-board.org/press/AI-risks-disclosure-2025",
  },
];

export const EVIDENCE = [
  {
    id: "the-law",
    title: "The Law",
    quote:
      "A contract may be formed by the interaction of electronic agents... even if no individual was aware of or reviewed the electronic agents\u2019 actions.",
    source: "Connecticut UETA",
    url: "https://www.cga.ct.gov/2023/pub/chap_015.htm",
    footnote: "Current law in 47 states.",
  },
  {
    id: "the-precedent",
    title: "The Precedent",
    quote:
      'Air Canada argued its chatbot was "a separate legal entity." The court called it "a remarkable submission."',
    source: "Moffatt v. Air Canada, 2024",
    url: "https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/",
    footnote: "Air Canada paid $812.02.",
  },
  {
    id: "the-future",
    title: "The Future",
    quote:
      "Visa, Mastercard, and PayPal launched AI agent payment protocols in 2025. Amazon\u2019s \u201CBuy for Me\u201D enters your credit card on third-party sites.",
    source: "Visa Commerce Network",
    url: "https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21716.html",
    footnote: "62% of AI vendors leave you exposed.",
  },
] as const;

export const FEATURES = [
  {
    title: "LLC Formation",
    description:
      "Wyoming or Delaware. Filed in 48 hours. Your agent gets liability protection. You get peace of mind.",
    icon: "building" as const,
    price: "From $299",
    href: "/#reserve",
    external: false,
  },
  {
    title: "24/7 AI Receptionist",
    description:
      "Your agent gets its own phone number with a 24/7 AI receptionist that answers, routes, and takes messages. Powered by CallDesk. Clients call. Your agent handles it.",
    icon: "phone" as const,
    price: "Included",
    href: "https://247calldesk.com",
    external: true,
  },
  {
    title: "Bank Account",
    description:
      "Business checking in your LLC's name. Your agent can invoice but can't withdraw. We thought about this.",
    icon: "landmark" as const,
    price: "Included",
    href: "/#reserve",
    external: false,
  },
  {
    title: "Email & EIN",
    description: "Federal tax ID, business email, registered agent service. The bureaucratic trifecta.",
    icon: "mail" as const,
    price: "Included",
    href: "/#reserve",
    external: false,
  },
] as const;

export const SHARE_TEMPLATES = {
  default: (llcName: string) =>
    `Just registered "${llcName}" — my AI agent is now a registered agent.\n\nThe future is here. It wants a registered agent.\n\nagentsand.co`,
  alt1: () =>
    `My AI agent just got an LLC.\nNow it needs a phone number so it can answer its own calls.\nThe future is weird.\n\nagentsand.co`,
  alt2: () =>
    `My AI agent now has:\n— An LLC\n— A phone number\n— A more legitimate business presence than most LinkedIn influencers\n\nagentsand.co`,
} as const;

export const DISCOUNT_TIERS = [
  {
    action: "Tweet about your reservation",
    reward: "1 month free CallDesk",
    cta: "Tweet now",
    icon: "twitter" as const,
  },
  {
    action: "Link your OpenClaw agent",
    reward: "2 months free CallDesk",
    cta: "Connect",
    icon: "link" as const,
  },
  {
    action: "Retweet + tag 3 friends",
    reward: "3 months free CallDesk",
    cta: "Retweet",
    icon: "repeat" as const,
  },
  {
    action: "Star the GitHub repo",
    reward: "Early access priority",
    cta: "Star on GitHub",
    icon: "star" as const,
  },
  {
    action: "Submit a PR",
    reward: "6 months free CallDesk",
    cta: "Contribute",
    icon: "code" as const,
  },
] as const;

export function tweetTemplate(llcName: string) {
  return SHARE_TEMPLATES.default(llcName);
}
