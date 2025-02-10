'use server'

import { products } from "@/data/products"
import { Product } from "@/types"

export async function getProducts(): Promise<Product[]> {
  return products
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id)
}