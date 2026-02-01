import type { LucideIcon } from "lucide-react";
import { FileText, Github, Landmark, Mail, Phone, Shield } from "lucide-react";

export type NavigationItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
};

export type NavigationCategory = {
  name: string;
  items: NavigationItem[];
};

export type NavigationMenu = {
  name: string;
  href?: string;
  items?: NavigationItem[];
  categories?: NavigationCategory[];
};

export const NAVIGATION_ITEMS: NavigationMenu[] = [
  {
    name: "Services",
    categories: [
      {
        name: "Formation",
        items: [
          { name: "Wyoming LLC", href: "/#states", icon: Shield },
          { name: "Delaware LLC", href: "/#states", icon: Landmark },
          { name: "Registered Agent", href: "/#trust", icon: Shield },
        ],
      },
      {
        name: "Business-in-a-Box",
        items: [
          { name: "Phone Number", href: "/#features", icon: Phone },
          { name: "Email & EIN", href: "/#features", icon: Mail },
        ],
      },
    ],
  },
  {
    name: "Pricing",
    href: "/#pricing",
  },
  {
    name: "Company",
    categories: [
      {
        name: "Legal",
        items: [
          { name: "Terms", href: "/terms", icon: FileText },
          { name: "Privacy", href: "/privacy", icon: Shield },
        ],
      },
      {
        name: "Open Source",
        items: [
          { name: "GitHub", href: "https://github.com/AgentsAndCo/agentsand", icon: Github },
        ],
      },
    ],
  },
];
