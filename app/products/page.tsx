import { Suspense } from 'react'
import { getProducts } from '@/app/actions'
import ProductSearch from '@/components/features/products/ProductSearch'
import FilterBar from '@/components/features/products/FilterBar'


export default async function ProductsPage() {
  const initialProducts = await getProducts()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-3xl font-medium text-neutral-900 mb-4">
          Our Collection
        </h1>
        <p className="text-neutral-600">
          Discover our range of premium water bottles designed for every lifestyle.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Suspense fallback={<FilterBarSkeleton />}>
            <FilterBar />
          </Suspense>
        </aside>
        <div className="lg:col-span-3">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductSearch initialProducts={initialProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
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
  )
}

function FilterBarSkeleton() {
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
  )
}