import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";
import type { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — agentsand.co",
  description:
    "How agentsand.co collects, uses, and protects your information.",
};

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: `We collect information necessary to provide our LLC reservation and formation services. This includes: your email address, the LLC name you choose, your selected state of formation (Wyoming or Delaware), member and manager information you provide, and usage and analytics data (pages visited, features used). Payment information is collected and processed by Stripe — we do not store credit card numbers or payment details on our servers.`,
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Information",
    content: `We use your information to: process your LLC name reservation and formation filings, send you confirmation emails and filing status updates, communicate important information about your LLC (such as annual report reminders and registered agent renewals), and improve our services. We do not use your information for advertising or sell it to third-party marketers.`,
  },
  {
    id: "legal-basis",
    title: "3. Legal Basis for Processing",
    content: `We process your personal information on the following legal bases: contractual necessity (to fulfill our obligations when you purchase a service), legitimate interest (to improve our services and prevent fraud), legal obligations (to comply with applicable laws, including tax and corporate filing requirements), and consent (where you have explicitly opted in, such as for non-essential communications). You may withdraw consent at any time by contacting us.`,
  },
  {
    id: "third-party-services",
    title: "4. Third-Party Services",
    content: `We use the following third-party services to operate: Stripe for payment processing (stripe.com/privacy), Resend for transactional email delivery, Vercel for hosting, applicable Secretary of State offices for LLC filings, and Cobalt Intelligence for name availability checks. These services process data only as necessary to provide their functionality and are bound by their own privacy policies. We do not control and are not responsible for the privacy practices of these third parties.`,
  },
  {
    id: "data-sharing",
    title: "5. Data Sharing",
    content: `We do not sell, rent, or trade your personal information to third parties. We share information only when necessary to: fulfill your service request (e.g., filing with the Secretary of State), comply with legal obligations (e.g., court orders, tax reporting), or protect our rights, safety, and property. In the event of a merger, acquisition, or sale of assets, your information may be transferred to the successor entity with prior notice.`,
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: `We retain your information for as long as your LLC is active and we are providing registered agent services. If you cancel services, we retain records for 7 years as required for legal and tax compliance purposes. After this period, data is securely deleted or anonymized. You may request deletion of your data at any time by emailing privacy@agentsand.co, subject to legal retention requirements.`,
  },
  {
    id: "security",
    title: "7. Security",
    content: `We implement reasonable security measures to protect your information, including encrypted connections (HTTPS/TLS), Stripe PCI-DSS compliance for payment processing, access controls and authentication on our internal systems, and regular review of our security practices. No method of transmission over the internet is 100% secure. While we strive to protect your data using commercially accepted means, we cannot guarantee absolute security.`,
  },
  {
    id: "cookies",
    title: "8. Cookies",
    content: `We use minimal cookies necessary for site functionality, such as theme preference. We do not use tracking cookies, advertising cookies, or analytics that identify individual users. No third-party cookies are set by our site.`,
  },
  {
    id: "your-rights",
    title: "9. Your Rights",
    content: `You have the right to: access the personal information we hold about you, request correction of inaccurate information, request deletion of your information (subject to legal retention requirements), and opt out of non-essential communications. To exercise any of these rights, email privacy@agentsand.co. We will respond to requests within 30 days.`,
  },
  {
    id: "california-privacy-rights",
    title: "10. California Privacy Rights",
    content: `If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). Right to know: you may request the categories and specific pieces of personal information we have collected about you. Right to delete: you may request deletion of your personal information, subject to legal exceptions. Right to correct: you may request correction of inaccurate personal information. Right to opt-out of sale: we do not sell your personal information. We do not share your personal information for cross-context behavioral advertising. Categories of personal information we collect include: identifiers (name, email), commercial information (purchases, services obtained), and internet activity (usage data). These are collected for the business purposes described in Section 2. To exercise your rights, email privacy@agentsand.co or contact us using the information in Section 14.`,
  },
  {
    id: "international-users",
    title: "11. International Users",
    content: `Our services are based in and operated from the United States. If you access our services from outside the United States, your information will be transferred to and processed in the United States. By using our services, you consent to this transfer and processing. For users in the European Economic Area: we rely on Standard Contractual Clauses where applicable to provide adequate safeguards for cross-border data transfers. If you have questions about international data transfers, contact us at privacy@agentsand.co.`,
  },
  {
    id: "childrens-privacy",
    title: "12. Children's Privacy",
    content: `Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child under 18, we will take steps to delete that information promptly.`,
  },
  {
    id: "changes",
    title: "13. Changes",
    content: `We may update this privacy policy from time to time. When we make material changes, we will notify you via email at the address associated with your account. Continued use of our services after changes take effect constitutes your acceptance of the revised policy. The "Last updated" date at the top of this page indicates the most recent revision.`,
  },
  {
    id: "contact",
    title: "14. Contact",
    content: `If you have questions about this privacy policy or wish to exercise your data rights, contact us at privacy@agentsand.co. For general legal inquiries, email legal@agentsand.co. Agents & Co., Laramie County, Wyoming, United States.`,
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="February 1, 2026"
      contactEmail="privacy@agentsand.co"
      contactLabel="privacy@agentsand.co"
      sections={sections}
    />
  );
}
