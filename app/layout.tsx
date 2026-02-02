import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Agents & Co. — The Registered Agent for AI Agents",
    template: "%s | Agents & Co.",
  },
  description:
    "Register your AI agent's LLC in Wyoming or Delaware. Real-time name availability, $99 reservation, full formation from $299. Registered agent service included.",
  applicationName: "Agents & Co.",
  keywords: [
    "LLC formation",
    "AI agent LLC",
    "registered agent for AI",
    "Wyoming LLC formation",
    "Delaware LLC formation",
    "AI business entity",
    "LLC name reservation",
    "registered agent service",
    "form an LLC online",
    "AI agent business",
    "OpenClaw",
    "autonomous agent liability",
    "AI agent protection",
    "agentic AI liability",
  ],
  authors: [{ name: "Agents & Co.", url: siteConfig.url }],
  creator: "Agents & Co.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Agents & Co. — The Registered Agent for AI Agents",
    description:
      "Register your AI agent's LLC. Wyoming & Delaware formation, real-time name check, registered agent included. Starting at $99.",
    url: siteConfig.url,
    siteName: "Agents & Co.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Agents & Co. — The registered agent for AI agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@agentsandco",
    creator: "@agentsandco",
    title: "Agents & Co. — The Registered Agent for AI Agents",
    description:
      "Register your AI agent's LLC. Wyoming & Delaware formation, real-time name check, registered agent included. Starting at $99.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Agents & Co. — The registered agent for AI agents",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistSans.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          <Header />
          <main className="relative min-h-screen w-full overflow-x-clip scroll-smooth pt-14">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
