export type ProductSortOption = 'name' | 'price-asc' | 'price-desc'

export interface ProductFilterOptions {
  query?: string
  minPrice?: number
  maxPrice?: number
  categories?: string[]
  sortBy?: ProductSortOption
}