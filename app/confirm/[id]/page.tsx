import { getRegistrationRequest } from "@/app/lib/db";
import ConfirmClient from "./ConfirmClient";

export default async function ConfirmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await getRegistrationRequest(id);

  if (!request) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Request not found</h1>
          <p className="text-neutral-400">This registration request doesn&apos;t exist or has been removed.</p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-[#A8F1F7] px-6 py-3 font-semibold text-neutral-900 transition-all hover:bg-[#A8F1F7]/80"
          >
            Go to Agents&amp;
          </a>
        </div>
      </div>
    );
  }

  const isExpired = new Date(request.expires_at) < new Date();
  const isApproved = request.status === "approved";

  if (isExpired && !isApproved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Request expired</h1>
          <p className="text-neutral-400">
            This registration request has expired. Your agent can submit a new one.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-[#A8F1F7] px-6 py-3 font-semibold text-neutral-900 transition-all hover:bg-[#A8F1F7]/80"
          >
            Start Over
          </a>
        </div>
      </div>
    );
  }

  if (isApproved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-400">
            <span className="text-lg">&#10003;</span> Approved
          </div>
          <h1 className="mb-4 text-2xl font-bold text-white">{request.llc_name}</h1>
          <p className="text-neutral-400">This LLC has been approved and is being processed.</p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-[#A8F1F7] px-6 py-3 font-semibold text-neutral-900 transition-all hover:bg-[#A8F1F7]/80"
          >
            Back to Agents&amp;
          </a>
        </div>
      </div>
    );
  }

  return <ConfirmClient request={request} />;
}
