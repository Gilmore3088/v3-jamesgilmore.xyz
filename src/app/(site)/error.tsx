"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <p className="hand -rotate-2 text-2xl text-coral">well, that broke</p>
      <h1 className="mt-2 font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl">Something went <span className="hl">sideways.</span></h1>
      <p className="mt-6 max-w-xl text-lg text-muted">An unexpected error interrupted this page. Try loading it again, or head back home.</p>
      {error.digest && <p className="mt-2 text-sm text-muted">Reference: <code>{error.digest}</code></p>}
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn"><RotateCcw size={16} /> Try again</button>
        <Link href="/" className="btn btn-outline"><Home size={16} /> Go home</Link>
      </div>
    </div>
  );
}
