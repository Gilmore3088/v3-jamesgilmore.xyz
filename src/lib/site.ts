import { site } from "@/content/site";

export const SITE_URL = site.url;
export const SITE_NAME = site.name;

/** Serialize JSON-LD safely for a <script> tag (prevents `</script>` injection). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
