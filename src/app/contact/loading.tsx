export default function Loading() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-16 space-y-10">
        <div className="space-y-3">
          <div className="h-4 w-24 rounded-full skeleton shimmer" />
          <div className="h-9 w-64 rounded-2xl skeleton shimmer" />
          <div className="h-4 w-80 rounded-full skeleton shimmer" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="glass-soft rounded-3xl p-5 space-y-3">
              <div className="h-5 w-36 rounded-full skeleton shimmer" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="h-4 w-full rounded-full skeleton shimmer" />
                    <div className="mt-2 h-4 w-4/5 rounded-full skeleton shimmer" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-soft rounded-3xl p-5">
              <div className="h-5 w-32 rounded-full skeleton shimmer" />
              <div className="mt-3 h-4 w-full rounded-full skeleton shimmer" />
              <div className="mt-2 h-4 w-3/4 rounded-full skeleton shimmer" />
            </div>
          </div>

          <div className="glass-soft rounded-3xl p-5 space-y-4">
            <div className="h-12 w-full rounded-2xl skeleton shimmer" />
            <div className="h-12 w-full rounded-2xl skeleton shimmer" />
            <div className="h-28 w-full rounded-2xl skeleton shimmer" />
            <div className="h-12 w-40 rounded-full skeleton shimmer" />
            <div className="h-4 w-44 rounded-full skeleton shimmer" />
          </div>
        </div>
      </main>
    </div>
  );
}
