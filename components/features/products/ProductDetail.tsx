import { Product } from "@/types/product.types";
import { Check } from "lucide-react";
import Image from "next/image";

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          quality={85}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium text-neutral-900 mb-4">
          {product.name}
        </h1>
        <p className="text-neutral-600 mb-6">{product.description}</p>
        <p className="text-2xl font-medium text-neutral-900 mb-8">
          ${product.price.toFixed(2)}
        </p>
        <div className="mb-8">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">
            Features
          </h2>
          <ul className="space-y-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center text-neutral-600">
                <Check className="w-5 h-5 text-primary-600 mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <form className="mt-auto">
          <input type="hidden" name="productId" value={product.id} />
          <button
            type="submit"
            className="w-full h-12 font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors"
          >
            Add to Cart
          </button>
        </form>
      </div>
    </div>
  );
}
