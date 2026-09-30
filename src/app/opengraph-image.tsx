import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}. Runner, trip planner, builder of things.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div style={{ background: "linear-gradient(135deg, #15130F 0%, #1F1B15 100%)", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "10px", height: "100%", background: "linear-gradient(180deg, #E0C48C 0%, #C9A96A 45%, #9C7F49 100%)" }} />
      <div style={{ fontSize: 20, color: "#C9A96A", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 28 }}>47.6062° N · 122.3321° W · Seattle</div>
      <div style={{ fontSize: 76, fontWeight: 700, fontFamily: "Georgia, serif", color: "#EFE6D3", lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 940 }}>I&apos;m James. I run far, plan trips like heists, and build stuff.</div>
      <div style={{ display: "flex", marginTop: 34, fontSize: 26, fontStyle: "italic", fontFamily: "Georgia, serif", color: "#C9A96A" }}>Fintech by day. Everything else by curiosity.</div>
      <div style={{ position: "absolute", bottom: 52, right: 80, fontSize: 20, color: "#A69C86", letterSpacing: "0.05em" }}>jamesgilmore.xyz</div>
    </div>,
    { ...size }
  );
}
