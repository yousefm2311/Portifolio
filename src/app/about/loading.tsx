export default function Loading() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-16 space-y-10">
        <div className="space-y-3">
          <div className="h-4 w-20 rounded-full skeleton shimmer" />
          <div className="h-9 w-64 rounded-2xl skeleton shimmer" />
          <div className="h-4 w-80 rounded-full skeleton shimmer" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-soft rounded-3xl p-6 space-y-4">
            <div className="h-5 w-56 rounded-full skeleton shimmer" />
            <div className="h-4 w-full rounded-full skeleton shimmer" />
            <div className="h-4 w-5/6 rounded-full skeleton shimmer" />
            <div className="flex flex-wrap gap-2 pt-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-7 w-28 rounded-full skeleton shimmer" />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="glass-soft rounded-3xl p-5">
                <div className="h-5 w-32 rounded-full skeleton shimmer" />
                <div className="mt-3 h-4 w-full rounded-full skeleton shimmer" />
                <div className="mt-2 h-4 w-4/5 rounded-full skeleton shimmer" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-11 w-48 rounded-full skeleton shimmer" />
        </div>
      </main>
    </div>
  );
}
