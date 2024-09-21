'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true)
      try {
        const data = await getProducts(undefined, undefined, undefined, 3)
        setFeaturedProducts(data)
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Welcome to My Store</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        {isLoading ? (
          <p>Loading featured products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard product={product} key={product.product_id}></ProductCard>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}