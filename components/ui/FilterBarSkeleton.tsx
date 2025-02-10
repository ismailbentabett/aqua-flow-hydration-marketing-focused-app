export function FilterBarSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 sticky top-24 space-y-8">
      <div className="animate-pulse space-y-4">
        <div className="h-7 bg-neutral-100 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-10 bg-neutral-100 rounded" />
          <div className="h-10 bg-neutral-100 rounded" />
        </div>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-7 bg-neutral-100 rounded w-1/2" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-neutral-100 rounded" />
          ))}
        </div>
      </div>
      <div className="animate-pulse space-y-4">
        <div className="h-7 bg-neutral-100 rounded w-1/2" />
        <div className="h-10 bg-neutral-100 rounded" />
      </div>
    </div>
  );
}
