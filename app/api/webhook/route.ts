import { NextRequest, NextResponse } from "next/server";

import { sql, assignPosition, processReferral, updateRegistrationRequestStatus } from "@/app/lib/db";
import { sendReservationConfirmation, sendReservationNotification } from "@/app/lib/resend";
import { getStripe } from "@/app/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    if (metadata?.llcName && metadata?.state && metadata?.email) {
      const details = {
        email: metadata.email,
        llcName: metadata.llcName,
        state: metadata.state as "WY" | "DE",
        sessionId: session.id,
        product: metadata.product || "reservation",
      };

      // Fire emails and DB insert in parallel
      await Promise.allSettled([
        sendReservationNotification(details),
        sendReservationConfirmation(details),
        sql`
          INSERT INTO reservations (llc_name, state, email, product, stripe_session_id)
          VALUES (${details.llcName}, ${details.state}, ${details.email}, ${details.product}, ${details.sessionId})
          ON CONFLICT (stripe_session_id) DO NOTHING
        `,
      ]);

      // Assign queue position after insert
      await assignPosition(details.sessionId).catch(console.error);

      // Mark registration request as approved if this came from agent path
      const requestId = metadata.request_id;
      if (requestId) {
        await updateRegistrationRequestStatus(requestId, "approved").catch(console.error);
      }

      // Credit referrer if this came via a referral link
      const referrerEmail = metadata.ref;
      if (referrerEmail) {
        await processReferral(referrerEmail).catch(console.error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
