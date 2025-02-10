export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse bg-white p-4 rounded-lg shadow">
          <div className="h-48 bg-neutral-100 rounded mb-4" />
          <div className="h-6 bg-neutral-100 rounded w-3/4 mb-2" />
          <div className="h-6 bg-neutral-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
