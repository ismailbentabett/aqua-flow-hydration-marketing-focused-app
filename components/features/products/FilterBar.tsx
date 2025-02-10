"use client";

import { useCallback, useEffect, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SortOption } from "@/types";
import useDebounce from "@/hooks/useDebounce";

const CATEGORIES = ["Sports", "Daily", "Travel"];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function FilterBar() {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string | string[]>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        newSearchParams.delete(key);
        if (Array.isArray(value)) {
          value.forEach((v) => {
            if (v) newSearchParams.append(key, v);
          });
        } else if (value) {
          newSearchParams.set(key, value);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const updateRoute = useCallback(
    async (params: Record<string, string | string[]>) => {
      startTransition(() => {
        router.push(`${pathname}?${createQueryString(params)}`, {
          scroll: false,
        });
      });
    },
    [pathname, router, createQueryString]
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

  useEffect(() => {
    return () => {
      cancelDebouncedUpdate();
    };
  }, [cancelDebouncedUpdate]);

  const validatePriceInput = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) return "";
    return num.toString();
  };

  return (
    <div className="bg-white rounded-2xl p-6 sticky top-24">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            Price Range
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              min="0"
              step="0.01"
              className="w-24 px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
              defaultValue={searchParams.get("minPrice") || ""}
              onChange={(e) => {
                const validValue = validatePriceInput(e.target.value);
                updateFilters({ minPrice: validValue });
              }}
            />
            <span className="text-neutral-400">to</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              min="0"
              step="0.01"
              className="w-24 px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
              defaultValue={searchParams.get("maxPrice") || ""}
              onChange={(e) => {
                const validValue = validatePriceInput(e.target.value);
                updateFilters({ maxPrice: validValue });
              }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            Categories
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((category) => {
              const currentCategories = searchParams.getAll("categories");
              return (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
                    defaultChecked={currentCategories.includes(category)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...currentCategories, category]
                        : currentCategories.filter((c) => c !== category);
                      updateFilters({ categories: newCategories });
                    }}
                  />
                  <span className="ml-2 text-neutral-600">{category}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Sort By</h3>
          <select
            name="sortBy"
            className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900"
            defaultValue={searchParams.get("sortBy") || "name"}
            onChange={(e) => updateFilters({ sortBy: e.target.value })}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
