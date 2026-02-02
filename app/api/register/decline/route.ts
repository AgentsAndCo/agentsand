import { NextRequest, NextResponse } from "next/server";

import { updateRegistrationRequestStatus } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { request_id } = body;

    if (!request_id || typeof request_id !== "string") {
      return NextResponse.json({ error: "request_id is required" }, { status: 400 });
    }

    await updateRegistrationRequestStatus(request_id, "expired");
    return NextResponse.json({ status: "expired" });
  } catch (error) {
    console.error("Decline error:", error);
    return NextResponse.json({ error: "Failed to decline" }, { status: 500 });
  }
}
