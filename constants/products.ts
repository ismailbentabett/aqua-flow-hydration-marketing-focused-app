import type { ProductSortOption } from "@/types/filter.types";

export const PRODUCT_CATEGORIES = ["Sports", "Daily", "Travel"];

export const PRODUCT_SORT_OPTIONS: {
  value: ProductSortOption;
  label: string;
}[] = [
  { value: "name", label: "Name" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];