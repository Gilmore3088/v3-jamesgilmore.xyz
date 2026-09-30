import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} - Builder & Systems Thinker`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0C0C0C 0%, #151515 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Gold accent rule along the left edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "10px",
          height: "100%",
          background: "linear-gradient(180deg, #D4BA8A 0%, #C5A572 40%, #A88B5C 100%)",
        }}
      />

      {/* Monogram */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "72px",
          height: "72px",
          borderRadius: "12px",
          border: "2px solid #C5A572",
          color: "#C5A572",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          marginBottom: "40px",
        }}
      >
        JG
      </div>

      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          color: "#F0F0F0",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        {SITE_NAME}
      </div>

      <div
        style={{
          fontSize: 22,
          color: "#C5A572",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: "20px",
        }}
      >
        Builder &amp; Systems Thinker
      </div>

      <div
        style={{
          fontSize: 26,
          color: "#9A9A9A",
          lineHeight: 1.5,
          maxWidth: "860px",
          marginTop: "36px",
        }}
      >
        {SITE_DESCRIPTION}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "56px",
          right: "80px",
          fontSize: 20,
          color: "#808080",
          letterSpacing: "0.05em",
        }}
      >
        jamesgilmore.xyz
      </div>
    </div>,
    { ...size }
  );
}
