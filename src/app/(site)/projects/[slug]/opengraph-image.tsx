import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return new ImageResponse(
      <div
        style={{
          background: "#0C0C0C",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F0F0F0",
          fontSize: 48,
        }}
      >
        Project Not Found
      </div>,
      { ...size }
    );
  }

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
      }}
    >
      <div
        style={{
          fontSize: 22,
          color: "#C5A572",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "24px",
        }}
      >
        {project.category ?? "Project"}
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "#F0F0F0",
          lineHeight: 1.1,
          marginBottom: "24px",
        }}
      >
        {project.title}
      </div>
      {project.description && (
        <div
          style={{
            fontSize: 22,
            color: "#9A9A9A",
            lineHeight: 1.5,
            maxWidth: "800px",
          }}
        >
          {project.description.slice(0, 120)}
          {project.description.length > 120 ? "..." : ""}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "80px",
          fontSize: 18,
          color: "#5A5A5A",
        }}
      >
        jamesgilmore.xyz
      </div>
    </div>,
    { ...size }
  );
}
