import { ProductFilterOptions, ProductSortOption } from "@/types/filter.types";

export function extractFilterOptions(formData: FormData): ProductFilterOptions  {
  return {
    query: formData.get("query") as string | undefined,
    minPrice: formData.get("minPrice") 
      ? Number(formData.get("minPrice")) 
      : undefined,
    maxPrice: formData.get("maxPrice")
      ? Number(formData.get("maxPrice"))
      : undefined,
    categories: formData.getAll("categories") as string[],
    sortBy: (formData.get("sortBy") as ProductSortOption ) || "name"
  }
}