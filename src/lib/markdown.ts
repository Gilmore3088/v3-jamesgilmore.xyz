import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "h1", "h2", "h3", "h4", "h5", "h6", "a", "ul", "ol", "li",
  "strong", "em", "code", "pre", "blockquote", "img", "br", "hr",
  "table", "thead", "tbody", "tr", "th", "td", "span", "div", "sup", "sub",
];

const ALLOWED_ATTR = ["href", "src", "alt", "class", "target", "rel", "id"];

export async function renderMarkdown(content: string): Promise<string> {
  const rawHtml = await marked(content);
  return DOMPurify.sanitize(rawHtml, { ALLOWED_TAGS, ALLOWED_ATTR });
}

export function estimateReadingTime(content: string): number {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
