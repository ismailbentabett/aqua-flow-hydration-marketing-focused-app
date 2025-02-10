"use client";

import { filterProducts } from "@/app/actions";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import ProductGrid from "./ProductGrid";
import { Product } from "@/types/product.types";

interface ProductSearchProps {
  initialProducts: Product[];
}

export default function ProductSearch({ initialProducts }: ProductSearchProps) {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = async (formData: FormData) => {
    startTransition(async () => {
      const results = await filterProducts(formData);
      setProducts(results);

      const newParams = new URLSearchParams(searchParams);
      const query = formData.get("query");
      if (query) {
        newParams.set("query", query as string);
      } else {
        newParams.delete("query");
      }
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    });
  };

  const [debouncedSearch, cancelSearch] = useDebounce(search, 300);

  async function handleSearch(formData: FormData) {
    searchParams.forEach((value, key) => {
      if (key !== "query") {
        formData.append(key, value);
      }
    });

    await debouncedSearch(formData);
  }

  useEffect(() => {
    const formData = new FormData();
    searchParams.forEach((value, key) => {
      formData.append(key, value);
    });

    startTransition(async () => {
      const results = await filterProducts(formData);
      setProducts(results);
    });
  }, [searchParams]);

  useEffect(() => {
    return () => {
      cancelSearch();
    };
  }, [cancelSearch]);

  return (
    <div>
      <form action={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            name="query"
            placeholder="Search products..."
            defaultValue={searchParams.get("query") ?? ""}
            className="w-full h-12 pl-12 pr-4 text-neutral-900 placeholder-neutral-400 bg-white border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-900 transition-colors"
            onChange={(e) => {
              const formData = new FormData();
              formData.set("query", e.target.value);
              handleSearch(formData);
            }}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>
      {isPending && (
        <div className="flex justify-center mb-8">
          <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <ProductGrid products={products} />
    </div>
  );
}
