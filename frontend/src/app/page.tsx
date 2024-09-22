'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import PageLoading from '@/components/loading/PageLoading'

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

  if (isLoading) {
    return <PageLoading size={48} />
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-orange-500">Welcome to AllMart</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard product={product} key={product.product_id}></ProductCard>
            ))}
          </div>
      </section>
    </div>
  )
}