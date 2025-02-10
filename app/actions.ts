"use server";

import { products } from "@/data/products";
import type { Product } from "@/types";
import {
  processSearchTerms,
  matchesSearchTerms,
  applyPriceFilters,
  applyCategoryFilter,
  sortProducts,
} from "@/lib/product-filters";
import { extractFilterOptions } from "@/lib/form-utils";

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function filterProducts(formData: FormData): Promise<Product[]> {
  try {
    const options = extractFilterOptions(formData);
    let filteredProducts = [...products];

    if (options.query) {
      const searchTerms = processSearchTerms(options.query);
      filteredProducts = filteredProducts.filter((product) =>
        matchesSearchTerms(product, searchTerms)
      );
    }

    filteredProducts = applyPriceFilters(
      filteredProducts,
      options.minPrice,
      options.maxPrice
    );

    filteredProducts = applyCategoryFilter(
      filteredProducts,
      options.categories
    );

    return sortProducts(filteredProducts, options.sortBy);
  } catch (error) {
    console.error("Filter error:", error);
    return products;
  }
}
