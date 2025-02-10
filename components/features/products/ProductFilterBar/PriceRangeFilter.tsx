'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { validatePriceRangeInput } from '@/utils/validation'

interface PriceRangeFilterProps {
  onUpdate: (params: Record<string, string>) => void
}

export default function PriceRangeFilter({ onUpdate }: PriceRangeFilterProps) {
  const searchParams = useSearchParams()
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')

  useEffect(() => {
    setMinPrice(searchParams.get('minPrice') || '')
    setMaxPrice(searchParams.get('maxPrice') || '')
  }, [searchParams])

  const handleIncrement = (field: 'minPrice' | 'maxPrice') => {
    const currentValue = field === 'minPrice' ? minPrice : maxPrice
    const value = currentValue ? parseFloat(currentValue) : 0
    const newValue = (value + 1).toString()

    if (field === 'minPrice') {
      setMinPrice(newValue)
      onUpdate({ minPrice: newValue })
    } else {
      setMaxPrice(newValue)
      onUpdate({ maxPrice: newValue })
    }
  }

  const handleDecrement = (field: 'minPrice' | 'maxPrice') => {
    const currentValue = field === 'minPrice' ? minPrice : maxPrice
    const value = currentValue ? parseFloat(currentValue) : 0
    
    if (value > 0) {
      const newValue = (value - 1).toString()
      if (field === 'minPrice') {
        setMinPrice(newValue)
        onUpdate({ minPrice: newValue })
      } else {
        setMaxPrice(newValue)
        onUpdate({ maxPrice: newValue })
      }
    }
  }

  const handleInputChange = (value: string, field: 'minPrice' | 'maxPrice') => {
    const validValue = validatePriceRangeInput(value)
    
    if (field === 'minPrice') {
      setMinPrice(validValue)
      onUpdate({ minPrice: validValue })
    } else {
      setMaxPrice(validValue)
      onUpdate({ maxPrice: validValue })
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Price Range</h3>
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center">
          <button
            type="button"
            className="absolute left-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            onClick={() => handleDecrement('minPrice')}
          >
            -
          </button>
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            min="0"
            step="1"
            className="w-24 px-8 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-900 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={minPrice}
            onChange={(e) => handleInputChange(e.target.value, 'minPrice')}
          />
          <button
            type="button"
            className="absolute right-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            onClick={() => handleIncrement('minPrice')}
          >
            +
          </button>
        </div>
        <span className="text-neutral-400">to</span>
        <div className="relative flex items-center">
          <button
            type="button"
            className="absolute left-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            onClick={() => handleDecrement('maxPrice')}
          >
            -
          </button>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            min="0"
            step="1"
            className="w-24 px-8 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-neutral-900 text-neutral-900 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={maxPrice}
            onChange={(e) => handleInputChange(e.target.value, 'maxPrice')}
          />
          <button
            type="button"
            className="absolute right-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            onClick={() => handleIncrement('maxPrice')}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}