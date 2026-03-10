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
      <article className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-gold/60">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-gold/10 px-3 py-1 font-medium text-gold">
            {category}
          </span>
          <time dateTime={created_at} className="text-text-muted">
            {formattedDate}
          </time>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-text-primary group-hover:text-gold transition-colors">
          {title}
        </h3>

        <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      </article>
    </Link>
  );
}
