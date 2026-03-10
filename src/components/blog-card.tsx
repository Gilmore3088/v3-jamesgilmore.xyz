import Link from "next/link";
import { format } from "date-fns";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  slug: string;
}

export default function BlogCard({
  title,
  excerpt,
  category,
  created_at,
  slug,
}: BlogCardProps) {
  const formattedDate = format(new Date(created_at), "MMMM d, yyyy");

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-gold/40 hover:gold-glow">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
          {category}
        </span>

        <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-text-primary transition-colors group-hover:text-gold">
          {title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
          {excerpt}
        </p>

        <time
          dateTime={created_at}
          className="mt-5 block text-xs text-text-muted"
        >
          {formattedDate}
        </time>
      </article>
    </Link>
  );
}
