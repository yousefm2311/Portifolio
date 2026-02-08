export default function Loading() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-16 space-y-10">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded-full skeleton shimmer" />
          <div className="h-9 w-64 rounded-2xl skeleton shimmer" />
          <div className="h-4 w-80 rounded-full skeleton shimmer" />
        </div>

        <div className="glass-soft rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-8 w-24 rounded-full skeleton shimmer" />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-10 w-full max-w-sm rounded-2xl skeleton shimmer" />
            <div className="h-10 w-24 rounded-full skeleton shimmer" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="glass-soft overflow-hidden rounded-2xl border border-white/10"
            >
              <div className="h-44 w-full skeleton shimmer" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-28 rounded-full skeleton shimmer" />
                <div className="h-4 w-full rounded-full skeleton shimmer" />
                <div className="h-4 w-4/5 rounded-full skeleton shimmer" />
                <div className="h-9 w-28 rounded-full skeleton shimmer" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
