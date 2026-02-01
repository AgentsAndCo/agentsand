import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";
import type { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — agentsand.co",
  description:
    "Terms of service for LLC name reservation and formation services.",
};

const sections: LegalSection[] = [
  {
    id: "services",
    title: "1. Services",
    content: `agentsand.co ("Agents & Co.", "we", "us", "our") provides LLC name reservation, LLC formation, registered agent, and Business in a Box services in Wyoming and Delaware. By using our services, you agree to these terms in full.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content: `You must be at least 18 years of age and have the legal capacity to enter into a binding agreement. At least one natural person must be identified as the responsible party for each LLC formed through our platform. Organizations and AI agents may use our services, but a human account holder must be designated and remains responsible for the account and all activity under it.`,
  },
  {
    id: "ai-agent-access",
    title: "3. AI Agent Access",
    content: `AI agents may interact with our platform and API to reserve LLC names, initiate formation filings, and manage related services on behalf of a human account holder. The human account holder is fully responsible for all actions taken by any AI agent operating under their account, including but not limited to filings, payments, and communications. We do not independently verify whether an action was initiated by a human or an AI agent. Granting an AI agent access to your account constitutes your authorization of any actions it takes.`,
  },
  {
    id: "name-reservation",
    title: "4. Name Reservation",
    content: `The $99 name reservation fee reserves your chosen LLC name on our platform for 120 days. During this period, no other customer can reserve the same LLC name through our service. This is not a filing with any Secretary of State — the actual state filing occurs when you proceed to full formation. This fee is credited toward the cost of full LLC formation if you choose to proceed. If the LLC name is unavailable with the state at the time of filing, we will work with you to select an alternative name or issue a full refund. Once a reservation has been processed, the fee is non-refundable.`,
  },
  {
    id: "llc-formation",
    title: "5. LLC Formation",
    content: `LLC formation services include preparation and filing of Articles of Organization, a standard Operating Agreement, and first-year registered agent service. Formation timelines depend on state processing: Wyoming typically processes in 1–3 business days; Delaware in 3–5 business days. These timelines are estimates and not guarantees. We are not a law firm and do not provide legal advice. Our Operating Agreement is a standard template and may not address all circumstances. For legal matters specific to your situation, consult a licensed attorney.`,
  },
  {
    id: "registered-agent",
    title: "6. Registered Agent",
    content: `Registered agent service is included free for the first year with LLC formation. Renewal is $99 per year, billed annually. As your registered agent, we receive service of process and official state correspondence on behalf of your LLC and forward it to you promptly via email. You must maintain a registered agent at all times while your LLC is active, as required by state law. If you cancel our registered agent service, you are responsible for appointing a replacement and filing the appropriate change with the state before cancellation takes effect.`,
  },
  {
    id: "business-in-a-box",
    title: "7. Business in a Box",
    content: `Business in a Box is a bundled offering that may include a dedicated phone number (via CallDesk), business bank account setup assistance, EIN acquisition, and business email. Individual components of Business in a Box may be subject to their own terms of service from the respective service providers. We facilitate access to these services but do not guarantee the availability, approval, or continued operation of any third-party component. You are responsible for complying with the terms of each bundled service.`,
  },
  {
    id: "payment",
    title: "8. Payment",
    content: `All payments are processed securely via Stripe. Prices are in USD. The name reservation fee ($99) is charged at the time of checkout. Formation and other fees are charged separately when you elect to proceed. We do not store your credit card number or payment details on our servers. Stripe's terms of service and privacy policy govern payment processing.`,
  },
  {
    id: "refunds",
    title: "9. Refunds",
    content: `Name reservation fees are refundable only if we are unable to file the reservation (e.g., the name is unavailable and no alternative is agreed upon). Formation fees are refundable if we have not yet submitted the filing to the state. Once a filing has been submitted to the state, the associated fees are non-refundable regardless of the outcome. Registered agent fees are non-refundable for the current service year. Refunds are issued to the original payment method within 5–10 business days.`,
  },
  {
    id: "your-responsibilities",
    title: "10. Your Responsibilities",
    content: `You are responsible for ensuring the accuracy of all information you provide, including your LLC name, registered agent address, and member or manager information. You are responsible for maintaining your LLC in good standing, including filing annual reports, paying applicable state fees, and complying with all state and federal requirements. We may send reminders for annual reports and renewals as a courtesy, but we are not responsible for compliance deadlines or penalties resulting from missed filings.`,
  },
  {
    id: "intellectual-property",
    title: "11. Intellectual Property",
    content: `All intellectual property in the AgentSand platform — including but not limited to the website, software, APIs, branding, design, and content — is owned by Agents & Co. and protected by applicable intellectual property laws. You retain full ownership of your LLC and all associated business assets. Nothing in these terms transfers ownership of your LLC or its intellectual property to us. You may not reproduce, modify, or distribute any part of our platform without prior written consent.`,
  },
  {
    id: "disclaimer-of-warranties",
    title: "12. Disclaimer of Warranties",
    content: `Our services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not guarantee state processing times, the availability of any particular LLC name, or the outcome of any filing. We do not provide legal, tax, or financial advice. Our templates and documents are provided for informational purposes and should not be relied upon as legal counsel.`,
  },
  {
    id: "limitation-of-liability",
    title: "13. Limitation of Liability",
    content: `To the maximum extent permitted by law, our total liability for any claim arising from or related to our services is limited to the amount you paid for the specific service giving rise to the claim. We are not liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill. We are not responsible for delays, errors, or failures caused by state agencies, postal services, payment processors, or other third parties.`,
  },
  {
    id: "indemnification",
    title: "14. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Agents & Co., its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from or related to: your use of our services, any inaccurate information you provide, actions taken by AI agents operating under your account, your violation of these terms, or your violation of any applicable law or regulation.`,
  },
  {
    id: "termination",
    title: "15. Termination",
    content: `Either party may terminate the service relationship at any time. If you terminate, you remain responsible for any outstanding fees and for appointing a replacement registered agent if applicable. We may terminate or suspend your account if we reasonably believe you have violated these terms or are using our services for unlawful purposes. Upon termination, we will retain your data in accordance with our Privacy Policy. Provisions that by their nature should survive termination — including limitation of liability, indemnification, and governing law — will survive.`,
  },
  {
    id: "governing-law",
    title: "16. Governing Law",
    content: `These terms are governed by and construed in accordance with the laws of the State of Wyoming, without regard to conflict of law principles. Any disputes arising under or in connection with these terms shall be resolved exclusively in the state or federal courts located in Laramie County, Wyoming. You consent to the personal jurisdiction of such courts and waive any objection to venue.`,
  },
  {
    id: "changes",
    title: "17. Changes",
    content: `We may update these terms from time to time. When we make material changes, we will notify you via email at the address associated with your account. Continued use of our services after changes take effect constitutes your acceptance of the revised terms. If you do not agree with the updated terms, you should stop using our services.`,
  },
  {
    id: "contact",
    title: "18. Contact",
    content: `If you have questions about these terms, contact us at legal@agentsand.co. For privacy-related inquiries, see our Privacy Policy or email privacy@agentsand.co.`,
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="February 1, 2026"
      contactEmail="legal@agentsand.co"
      contactLabel="legal@agentsand.co"
      sections={sections}
    />
  );
}
