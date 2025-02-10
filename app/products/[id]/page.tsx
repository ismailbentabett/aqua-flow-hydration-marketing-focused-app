import { notFound } from "next/navigation"
import { getProductById } from "@/app/actions"
import ProductDetail from "@/components/features/products/ProductDetail"
import { use } from "react"

type Props = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params)
  const product = use(getProductById(id))

  if (!product) notFound()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <ProductDetail product={product} />
    </div>
  )
}