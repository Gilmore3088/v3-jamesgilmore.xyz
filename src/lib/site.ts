export const SITE_URL = "https://jamesgilmore.xyz";
export const SITE_NAME = "James Gilmore";
export const SITE_DESCRIPTION =
  "I run far, plan trips like heists, and build stuff that didn't exist yesterday. Seattle-based, fintech by day.";

export const SOCIAL = {
  github: "https://github.com/Gilmore3088",
  linkedin: "https://www.linkedin.com/in/JamesLGilmore",
  email: "JLGilmore2@gmail.com",
} as const;

/** Serialize JSON-LD safely for a <script> tag (prevents `</script>` injection). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
