import { getProducts } from "@/app/actions"
import ProductSearch from "@/components/features/products/ProductSearch"

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
          {/* filter bar hereeeeeeeeee */}
        </aside>
        <div className="lg:col-span-3">
          <ProductSearch initialProducts={initialProducts} />
        </div>
      </div>
    </div>
  )
}