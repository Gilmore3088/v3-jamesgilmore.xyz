import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <p className="eyebrow m-0">Error 404 · Off the map</p>
      <h1 className="mt-3 font-display text-5xl font-semibold leading-tight tracking-tight text-gold-gradient sm:text-7xl">That page wandered off.</h1>
      <p className="mt-6 max-w-xl text-lg text-muted">It has moved, never existed, or is still just an idea in a spreadsheet somewhere. Either way, there is nothing here yet.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn"><Home size={16} /> Go home</Link>
        <Link href="/projects" className="btn btn-outline"><ArrowLeft size={16} /> Projects</Link>
      </div>
    </div>
  );
}
