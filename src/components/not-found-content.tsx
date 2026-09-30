import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundContent() {
  return (
    <div className="noise-bg">
      <div className="mx-auto flex max-w-5xl flex-col items-start px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
        <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
          Error 404
        </p>
        <h1 className="animate-fade-up animation-delay-100 mt-3 font-display text-5xl font-bold text-gold-gradient sm:text-6xl lg:text-7xl">
          Page not found
        </h1>
        <hr className="hr-gold animate-fade-up animation-delay-200 mt-8 w-full max-w-[160px] opacity-40" />
        <p className="animate-fade-up animation-delay-200 mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
          The page you are looking for has moved, never existed, or is still
          just an idea. Either way, there is nothing here yet.
        </p>
        <div className="animate-fade-up animation-delay-300 mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/5"
          >
            <ArrowLeft size={16} />
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
