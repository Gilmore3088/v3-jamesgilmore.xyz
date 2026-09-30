export default function SiteLoading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-10 sm:px-6 sm:py-14 lg:px-8" aria-busy="true" aria-label="Loading">
      <div className="h-6 w-40 rounded-full bg-line" />
      <div className="mt-4 h-14 w-3/4 rounded-2xl bg-line" />
      <div className="mt-3 h-14 w-1/2 rounded-2xl bg-line" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-44 rounded-2xl border-2 border-line bg-paper" />
        ))}
      </div>
    </div>
  );
}
