'use server'

import { promises as fs } from 'fs'
import path from 'path'
import {
  processSearchTerms,
  matchesSearchTerms,
  applyPriceFilters,
  applyCategoryFilter,
  sortProducts,
} from "@/lib/product-filters"
import { extractFilterOptions } from "@/lib/form-utils"
import { Product } from "@/types/product.types"

async function getProductsData(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(jsonData)
    return data.products
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

export async function getProducts(): Promise<Product[]> {
  return getProductsData()
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProductsData()
  return products.find((p) => p.id === id)
}

export async function filterProducts(formData: FormData): Promise<Product[]> {
  try {
    const products = await getProductsData()
    const options = extractFilterOptions(formData)
    let filteredProducts = [...products]

    if (options.query) {
      const searchTerms = processSearchTerms(options.query)
      filteredProducts = filteredProducts.filter((product) =>
        matchesSearchTerms(product, searchTerms)
      )
    }

    filteredProducts = applyPriceFilters(
      filteredProducts,
      options.minPrice,
      options.maxPrice
    )

    filteredProducts = applyCategoryFilter(
      filteredProducts,
      options.categories
    )

    return sortProducts(filteredProducts, options.sortBy)
  } catch (error) {
    console.error("Filter error:", error)
    const products = await getProductsData()
    return products
  }
}