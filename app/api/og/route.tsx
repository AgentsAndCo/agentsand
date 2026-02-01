import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

async function getIconBase64() {
  const iconPath = join(process.cwd(), "app", "icon.png");
  const iconBuffer = await readFile(iconPath);
  return `data:image/png;base64,${iconBuffer.toString("base64")}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const state = searchParams.get("state");
  const iconSrc = await getIconBase64();

  if (name) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#09090b",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconSrc} width={80} height={80} alt="" style={{ borderRadius: "16px", marginBottom: "8px" }} />
            <div
              style={{
                fontSize: "14px",
                color: "rgba(168,241,247,0.5)",
                textTransform: "uppercase",
                letterSpacing: "4px",
              }}
            >
              LLC Name Reserved
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 700,
                color: "#A8F1F7",
                letterSpacing: "-2px",
                textAlign: "center",
                maxWidth: "900px",
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: "24px",
                color: "rgba(255,255,255,0.6)",
                marginTop: "8px",
              }}
            >
              is now a registered agent.
            </div>
            {state && (
              <div
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.3)",
                  marginTop: "4px",
                }}
              >
                {state === "WY" ? "Wyoming" : "Delaware"}
              </div>
            )}
            <div
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.4)",
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              agentsand.co
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Default OG (no params)
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={120} height={120} alt="" style={{ borderRadius: "24px", marginBottom: "4px" }} />
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#A8F1F7",
              letterSpacing: "-1px",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            The registered agent
            <br />
            for AI agents.
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.4)",
              marginTop: "12px",
            }}
          >
            agentsand.co
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
