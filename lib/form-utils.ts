import type { FilterOptions, SortOption } from "@/types"

export function extractFilterOptions(formData: FormData): FilterOptions {
  return {
    query: formData.get("query") as string | undefined,
    minPrice: formData.get("minPrice") 
      ? Number(formData.get("minPrice")) 
      : undefined,
    maxPrice: formData.get("maxPrice")
      ? Number(formData.get("maxPrice"))
      : undefined,
    categories: formData.getAll("categories") as string[],
    sortBy: (formData.get("sortBy") as SortOption) || "name"
  }
}