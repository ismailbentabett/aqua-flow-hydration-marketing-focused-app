'use client'

import { useSearchParams } from 'next/navigation'
import { PRODUCT_SORT_OPTIONS } from '@/constants/products'

interface ProductSortSelectProps {
  onUpdate: (params: Record<string, string>) => void
}

export default function ProductSortSelect({ onUpdate }: ProductSortSelectProps) {
  const searchParams = useSearchParams()

  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Sort By</h3>
      <select
        name="sortBy"
        className="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-900"
        defaultValue={searchParams.get('sortBy') || 'name'}
        onChange={(e) => onUpdate({ sortBy: e.target.value })}
      >
        {PRODUCT_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}