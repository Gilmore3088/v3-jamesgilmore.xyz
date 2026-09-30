import Link from "next/link";
import { format } from "date-fns";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  slug: string;
}

/** A post as a single row: title, one-line excerpt, handwritten date. */
export default function BlogCard({ title, excerpt, category, created_at, slug }: BlogCardProps) {
  const date = format(new Date(created_at), "MMM ''yy");

  return (
    <Link
      href={`/blog/${slug}`}
      className="group grid grid-cols-1 items-baseline gap-1 border-b-2 border-ink py-4 no-underline sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4"
    >
      <div className="min-w-0">
        <p className="m-0 text-[11px] font-extrabold uppercase tracking-wider text-teal">{category}</p>
        <h3 className="m-0 mt-0.5 font-display text-xl font-extrabold leading-tight tracking-tight group-hover:underline group-hover:decoration-coral group-hover:decoration-[3px] group-hover:underline-offset-4">
          {title}
        </h3>
        <p className="m-0 mt-1 line-clamp-2 text-[15px] text-muted">{excerpt}</p>
      </div>
      <time dateTime={created_at} className="hand whitespace-nowrap text-xl text-coral">
        {date}
      </time>
    </Link>
  );
}
