import Link from "next/link";
import { format } from "date-fns";

interface BlogCardProps { title: string; excerpt: string; category: string; created_at: string; slug: string; }

export default function BlogCard({ title, excerpt, category, created_at, slug }: BlogCardProps) {
  const date = format(new Date(created_at), "MMMM d, yyyy");
  return (
    <Link href={`/blog/${slug}`} className="group grid grid-cols-1 items-baseline gap-1 border-b border-line py-5 no-underline sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
      <div className="min-w-0">
        <p className="eyebrow m-0">{category}</p>
        <h3 className="m-0 mt-1 font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-gold">{title}</h3>
        <p className="m-0 mt-1.5 line-clamp-2 text-[15px] text-muted">{excerpt}</p>
      </div>
      <time dateTime={created_at} className="hand whitespace-nowrap text-lg">{date}</time>
    </Link>
  );
}
