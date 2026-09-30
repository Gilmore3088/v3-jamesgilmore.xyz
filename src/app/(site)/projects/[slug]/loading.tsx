export default function ProjectDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-10 sm:px-6 sm:py-14 lg:px-8" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-28 rounded-full bg-line" />
      <div className="mt-8 flex gap-2"><div className="h-6 w-20 rounded-full bg-line" /><div className="h-6 w-16 rounded-full bg-line" /></div>
      <div className="mt-4 h-12 w-3/4 rounded-2xl bg-line" />
      <div className="mt-4 h-5 w-1/2 rounded-full bg-line" />
      <div className="mx-auto mt-16 grid max-w-2xl gap-3">
        {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-4 rounded-full bg-line" style={{ width: `${100 - i * 12}%` }} />)}
      </div>
    </div>
  );
}
