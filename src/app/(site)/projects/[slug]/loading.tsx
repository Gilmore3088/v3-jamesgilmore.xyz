export default function ProjectDetailLoading() {
  return (
    <div className="noise-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-pulse">
        <div className="h-3 w-28 rounded bg-surface-light" />
        <div className="mt-12 flex gap-3">
          <div className="h-5 w-20 rounded-full bg-surface-light" />
          <div className="h-5 w-16 rounded-full bg-surface-light" />
        </div>
        <div className="mt-6 h-10 w-3/4 rounded bg-surface-light" />
        <div className="mt-4 h-5 w-1/2 rounded bg-surface-light" />
        <div className="mt-8 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-surface-light" />
          <div className="h-6 w-20 rounded-full bg-surface-light" />
          <div className="h-6 w-14 rounded-full bg-surface-light" />
        </div>
        <hr className="hr-gold opacity-10 mt-10 mb-12" />
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="h-4 w-full rounded bg-surface-light" />
          <div className="h-4 w-5/6 rounded bg-surface-light" />
          <div className="h-4 w-4/6 rounded bg-surface-light" />
          <div className="h-4 w-full rounded bg-surface-light" />
          <div className="h-4 w-3/4 rounded bg-surface-light" />
        </div>
      </div>
    </div>
  );
}
