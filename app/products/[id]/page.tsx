import { notFound } from "next/navigation";
import { getProductById } from "@/app/actions";
import ProductDetail from "@/components/features/products/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) notFound();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <ProductDetail product={product} />
    </div>
  );
}
