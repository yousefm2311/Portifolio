export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="pt-6 sm:pt-10">
          <div className="space-y-4">
            <div className="h-6 w-36 rounded-full skeleton shimmer" />
            <div className="h-12 w-full max-w-3xl rounded-2xl skeleton shimmer" />
            <div className="h-12 w-10/12 max-w-2xl rounded-2xl skeleton shimmer" />
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="h-10 w-28 rounded-full skeleton shimmer" />
              <div className="h-10 w-24 rounded-full skeleton shimmer" />
              <div className="h-10 w-32 rounded-full skeleton shimmer" />
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="glass-soft rounded-3xl p-4">
              <div className="h-36 w-full rounded-2xl skeleton shimmer" />
              <div className="mt-4 h-4 w-3/4 rounded-full skeleton shimmer" />
              <div className="mt-2 h-4 w-1/2 rounded-full skeleton shimmer" />
              <div className="mt-4 h-8 w-24 rounded-full skeleton shimmer" />
            </div>
          ))}
        </section>

        <section className="mt-12 space-y-6">
          <div className="h-6 w-44 rounded-full skeleton shimmer" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="glass rounded-3xl p-5">
                <div className="h-5 w-32 rounded-full skeleton shimmer" />
                <div className="mt-3 h-4 w-full rounded-full skeleton shimmer" />
                <div className="mt-2 h-4 w-4/5 rounded-full skeleton shimmer" />
                <div className="mt-6 h-24 w-full rounded-2xl skeleton shimmer" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <div className="h-6 w-52 rounded-full skeleton shimmer" />
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="glass-soft rounded-3xl p-5">
                <div className="h-4 w-40 rounded-full skeleton shimmer" />
                <div className="mt-3 h-4 w-full rounded-full skeleton shimmer" />
                <div className="mt-2 h-4 w-3/4 rounded-full skeleton shimmer" />
                <div className="mt-6 h-10 w-28 rounded-full skeleton shimmer" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
