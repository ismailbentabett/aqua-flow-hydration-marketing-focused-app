import type { Product, SortOption } from "@/types";

export function processSearchTerms(query: string): string[] {
  return query
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((term) => term.length > 0);
}

export function matchesSearchTerms(
  product: Product,
  searchTerms: string[]
): boolean {
  return searchTerms.every(
    (term) =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
  );
}

export function applyPriceFilters(
  products: Product[],
  minPrice?: number,
  maxPrice?: number
): Product[] {
  let filtered = products;

  if (typeof minPrice === "number" && !isNaN(minPrice)) {
    filtered = filtered.filter((product) => product.price >= minPrice);
  }

  if (typeof maxPrice === "number" && !isNaN(maxPrice)) {
    filtered = filtered.filter((product) => product.price <= maxPrice);
  }

  return filtered;
}

export function applyCategoryFilter(
  products: Product[],
  categories?: string[]
): Product[] {
  if (!categories?.length) return products;
  return products.filter((product) => categories.includes(product.category));
}

export function sortProducts(
  products: Product[],
  sortBy: SortOption = "name"
): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });
}
