import Link from "next/link"
import { Suspense } from "react"
import { ArrowRight, Droplet, Recycle, Shield } from "lucide-react"
import ProductCard from "@/components/ui/ProductCard"
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton"
import { getProducts } from "./actions"

async function FeaturedProducts() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.slice(0, 3).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function FeaturedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="min-h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900 mb-6">
              Mindful hydration for modern living
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Premium water bottles crafted for sustainability and style. Keep your drinks at the perfect temperature,
              wherever life takes you.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-medium text-neutral-900 text-center mb-16">Why choose AquaFlow?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Droplet, title: "Temperature Control", description: "24-hour cold, 12-hour hot retention." },
              { icon: Recycle, title: "Sustainable Design", description: "Made from recycled materials." },
              { icon: Shield, title: "Lifetime Warranty", description: "Built to last, guaranteed." },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-6 text-primary-600" />
                <h3 className="text-lg font-medium text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-medium text-neutral-900 text-center mb-16">Featured Products</h2>
          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>
    </>
  )
}

