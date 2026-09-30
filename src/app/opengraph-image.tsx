import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}. Runner, trip planner, builder of things.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div style={{ background: "#FFF8EC", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", position: "relative", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", top: 48, right: 72, background: "#FF6B4A", color: "#fff", border: "4px solid #1C1A1F", borderRadius: 999, padding: "12px 24px", fontSize: 26, fontWeight: 800, transform: "rotate(6deg)", boxShadow: "6px 6px 0 #1C1A1F" }}>SEATTLE, WA</div>
      <div style={{ position: "absolute", bottom: 60, right: 90, background: "#12A5B3", color: "#fff", border: "4px solid #1C1A1F", borderRadius: 999, padding: "12px 24px", fontSize: 26, fontWeight: 800, transform: "rotate(-5deg)", boxShadow: "6px 6px 0 #1C1A1F" }}>LONG RUNS</div>
      <div style={{ fontSize: 30, color: "#FF6B4A", marginBottom: 18 }}>hey, that&apos;s me</div>
      <div style={{ fontSize: 80, fontWeight: 800, color: "#1C1A1F", lineHeight: 1, letterSpacing: "-0.03em", maxWidth: 900 }}>I&apos;m James. I run far, plan trips like heists, and build stuff.</div>
      <div style={{ display: "flex", marginTop: 34, fontSize: 28, color: "#6B6570" }}>jamesgilmore.xyz</div>
      <div style={{ position: "absolute", left: 80, bottom: 52, width: 260, height: 18, background: "#F7BE34", transform: "rotate(-2deg)" }} />
    </div>,
    { ...size }
  );
}
