import { Resend } from "resend";

import { NOTIFICATION_EMAIL, SITE_URL } from "./constants";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface ReservationDetails {
  email: string;
  llcName: string;
  state: "WY" | "DE";
  sessionId: string;
}

export async function sendReservationNotification(details: ReservationDetails) {
  const { email, llcName, state, sessionId } = details;
  const stateName = state === "WY" ? "Wyoming" : "Delaware";

  return getResend().emails.send({
    from: "agentsand.co <notifications@agentsand.co>",
    to: NOTIFICATION_EMAIL,
    subject: `New LLC Reservation: ${llcName} (${stateName})`,
    html: `
      <h2>New LLC Name Reservation</h2>
      <table style="border-collapse: collapse;">
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">LLC Name</td><td>${llcName}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">State</td><td>${stateName}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Customer Email</td><td>${email}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Stripe Session</td><td>${sessionId}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Time</td><td>${new Date().toISOString()}</td></tr>
      </table>
      <p style="margin-top: 16px;">File name reservation manually:</p>
      <ul>
        <li><strong>Wyoming:</strong> wyobiz.wyo.gov — $60 mail form</li>
        <li><strong>Delaware:</strong> icis.corp.delaware.gov — $75 web portal</li>
      </ul>
    `,
  });
}

export async function sendReservationConfirmation(details: ReservationDetails) {
  const { email, llcName, state } = details;
  const stateName = state === "WY" ? "Wyoming" : "Delaware";
  const shareUrl = `${SITE_URL}?ref=${encodeURIComponent(email)}`;

  return getResend().emails.send({
    from: "agentsand.co <hello@agentsand.co>",
    to: email,
    subject: `Your AI is now a registered agent — ${llcName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
        <h1 style="font-size: 24px;">Your AI is now a registered agent.</h1>
        <div style="background: #111; border: 1px solid #333; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
          <p style="font-family: monospace; font-size: 20px; color: #2dd4bf; margin: 0;">${llcName}</p>
          <p style="color: #888; font-size: 14px; margin-top: 8px;">${stateName} LLC — Reserved</p>
        </div>

        <h2 style="font-size: 18px;">What happens next</h2>
        <ol style="line-height: 1.8;">
          <li>Your LLC name is reserved — no one else can claim it through our platform</li>
          <li>Your reservation is active for 120 days</li>
          <li>Your $99 is credited toward full LLC formation ($${state === "WY" ? "299" : "399"})</li>
          <li>We'll email you when it's time to complete formation</li>
        </ol>

        <h2 style="font-size: 18px;">Share & save</h2>
        <p>Share your registration and unlock discounts on CallDesk AI receptionist service:</p>
        <p><a href="${shareUrl}" style="color: #2dd4bf;">Your share link &rarr;</a></p>

        <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px;">
          This is a name reservation, not legal advice. $99 is non-refundable but credited toward formation.
          Questions? Reply to this email.
        </p>
      </div>
    `,
  });
}
