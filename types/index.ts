export interface Product {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  imageUrl: string
  category: string
}

export type SortOption = 'name' | 'price-asc' | 'price-desc'

export interface FilterOptions {
  query?: string
  minPrice?: number
  maxPrice?: number
  categories?: string[]
  sortBy?: SortOption
}