export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="relative aspect-square bg-neutral-100 animate-pulse" />
      <div className="p-6">
        <div className="h-7 bg-neutral-100 rounded animate-pulse mb-2 w-3/4" />
        <div className="space-y-2 mb-4">
          <div className="h-5 bg-neutral-100 rounded animate-pulse w-full" />
          <div className="h-5 bg-neutral-100 rounded animate-pulse w-2/3" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-7 w-20 bg-neutral-100 rounded animate-pulse" />
          <div className="h-5 w-24 bg-neutral-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
