"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="noise-bg">
      <div className="mx-auto flex max-w-5xl flex-col items-start px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold text-gold-gradient sm:text-6xl">
          Well, that broke.
        </h1>
        <hr className="hr-gold mt-8 w-full max-w-[160px] opacity-40" />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
          An unexpected error interrupted this page. You can try loading it
          again, or head back home.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-text-muted">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold-light"
          >
            <RotateCcw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/5"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
