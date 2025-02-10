import type { Product } from "@/types";
import Link from "next/link";
import ImageFallback from "./ImageFallback";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="relative aspect-square bg-neutral-100">
        <ImageFallback
          src={product.imageUrl}
          alt={product.name}
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">
          {product.name}
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-neutral-600">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
