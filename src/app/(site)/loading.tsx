export default function SiteLoading() {
  return (
    <div className="noise-bg" aria-busy="true" aria-label="Loading">
      <div className="mx-auto max-w-5xl animate-pulse px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="h-3 w-32 rounded bg-surface-light" />
        <div className="mt-4 h-10 w-64 rounded bg-surface-light sm:h-12" />
        <hr className="hr-gold mt-6 opacity-10" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-surface p-8"
            >
              <div className="h-3 w-20 rounded bg-surface-light" />
              <div className="mt-4 h-6 w-3/4 rounded bg-surface-light" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-surface-light" />
                <div className="h-4 w-5/6 rounded bg-surface-light" />
                <div className="h-4 w-2/3 rounded bg-surface-light" />
              </div>
              <div className="mt-6 flex gap-2">
                <div className="h-6 w-16 rounded-full bg-surface-light" />
                <div className="h-6 w-20 rounded-full bg-surface-light" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
