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
  title: `Agents & Co. — ${siteConfig.description}`,
  description:
    "Register your AI agent's LLC. Real name availability checking, Wyoming & Delaware formation, registered agent service included. $99 to reserve.",
  metadataBase: new URL(siteConfig.url),
  applicationName: "Agents & Co.",
  keywords: [
    "LLC formation",
    "AI agent",
    "registered agent",
    "Wyoming LLC",
    "Delaware LLC",
    "business formation",
  ],
  robots: "index, follow",
  authors: [{ name: "Agents & Co.", url: "https://agentsand.co" }],
  creator: "Agents & Co.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Agents & Co.",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Agents & Co.",
    images: [
      {
        url: `${siteConfig.url}/api/og`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@agentsandco",
    title: "Agents & Co.",
    description: siteConfig.description,
    images: [`${siteConfig.url}/api/og`],
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
