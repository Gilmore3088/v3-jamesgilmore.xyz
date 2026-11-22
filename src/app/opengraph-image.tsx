import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { plain } from "@/lib/emphasis";

export const alt = `${site.name}. ${plain(site.home.headline)}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Try to load the display face so the card matches the site. Falls back to a system serif. */
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    // A non-browser user agent makes Google Fonts return TrueType, which the image renderer needs.
    const css = await fetch("https://fonts.googleapis.com/css2?family=Newsreader:wght@400&display=swap", {
      headers: { "User-Agent": "curl/8" },
    }).then((r) => r.text());
    const url = css.match(/src: url\((https:\/\/fonts\.gstatic\.com[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OGImage() {
  const serif = await loadSerif();
  const fontFamily = serif ? "Newsreader" : "Georgia, serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f4efe6",
          color: "#1a1e1c",
          fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 20, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5f655f" }}>
          <span>{site.name}</span>
          <span>{site.home.eyebrow}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 1040, height: 1, background: "#1a1e1c", marginBottom: 40 }} />
          <div style={{ fontSize: 66, lineHeight: 1.05, letterSpacing: "-0.02em", maxWidth: 1000 }}>{plain(site.home.headline)}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#5f655f" }}>
          <span>{site.role}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif ? [{ name: "Newsreader", data: serif, style: "normal", weight: 400 }] : undefined,
    }
  );
}
