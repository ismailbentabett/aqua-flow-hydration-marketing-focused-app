'use client'

import { useSearchParams } from 'next/navigation'
import { PRODUCT_CATEGORIES } from '@/constants/products'

interface CategoryFilterProps {
  onUpdate: (params: Record<string, string[]>) => void
}

export default function CategoryFilter({ onUpdate }: CategoryFilterProps) {
  const searchParams = useSearchParams()

  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {PRODUCT_CATEGORIES.map((category) => {
          const currentCategories = searchParams.getAll('categories')
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
                    : currentCategories.filter((c) => c !== category)
                  onUpdate({ categories: newCategories })
                }}
              />
              <span className="ml-2 text-neutral-600">{category}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}