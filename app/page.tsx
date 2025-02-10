import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white" />
        </div>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-medium tracking-tight text-neutral-900 mb-6">
              Mindful hydration for modern living
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Premium water bottles crafted for sustainability and style. Keep
              your drinks at the perfect temperature, wherever life takes you.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-medium text-neutral-900 text-center mb-16">
            Why choose AquaFlow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Temperature Control
              </h3>
              <p className="text-neutral-600">
                24-hour cold, 12-hour hot temperature retention for optimal
                drink enjoyment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Sustainable Design
              </h3>
              <p className="text-neutral-600">
                Made from recycled materials without compromising on quality or
                durability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Lifetime Warranty
              </h3>
              <p className="text-neutral-600">
                Built to last with premium materials and backed by our lifetime
                guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-medium text-neutral-900 text-center mb-16">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
