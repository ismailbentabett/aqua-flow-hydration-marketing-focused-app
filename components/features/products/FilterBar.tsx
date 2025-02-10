"use client";

import { useCallback, useEffect, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { createFilterQueryString } from "@/utils/url";
import CategoryFilter from "./ProductFilterBar/CategoryFilter";
import PriceRangeFilter from "./ProductFilterBar/PriceRangeFilter";
import ProductSortSelect from "./ProductFilterBar/ProductSortSelect";
import { X } from "lucide-react";

export default function ProductFilterBar() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateRoute = useCallback(
    async (params: Record<string, string | string[]>) => {
      startTransition(() => {
        const queryString = createFilterQueryString(searchParams, params);
        router.push(`${pathname}?${queryString}`, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const [debouncedUpdateRoute, cancelDebouncedUpdate] = useDebounce(
    updateRoute,
    500
  );

  const updateFilters = useCallback(
    (params: Record<string, string | string[]>) => {
      if ("minPrice" in params || "maxPrice" in params) {
        debouncedUpdateRoute(params);
      } else {
        void updateRoute(params);
      }
    },
    [updateRoute, debouncedUpdateRoute]
  );

  const resetFilters = useCallback(() => {
    startTransition(() => {
      const currentQuery = searchParams.get("query");
      if (currentQuery) {
        router.push(`${pathname}?query=${encodeURIComponent(currentQuery)}`, {
          scroll: false,
        });
      } else {
        router.push(pathname, { scroll: false });
      }
    });
  }, [pathname, router, searchParams]);

  const hasActiveFilters = useCallback(() => {
    const filterParams = ["minPrice", "maxPrice", "categories", "sortBy"];
    return filterParams.some((param) => searchParams.has(param));
  }, [searchParams]);

  useEffect(() => {
    return () => {
      cancelDebouncedUpdate();
    };
  }, [cancelDebouncedUpdate]);

  return (
    <div className="bg-white rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-neutral-900">Filters</h2>
        {hasActiveFilters() && (
          <button
            onClick={resetFilters}
            disabled={isPending}
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Reset filters
          </button>
        )}
      </div>
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <PriceRangeFilter onUpdate={updateFilters} />
        <CategoryFilter onUpdate={updateFilters} />
        <ProductSortSelect onUpdate={updateFilters} />
      </form>
    </div>
  );
}
