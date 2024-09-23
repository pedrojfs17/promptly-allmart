'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import PageLoading from '@/components/loading/PageLoading'
import { useToastNotifications } from '@/hooks/useToastNotifications'

export default function Home() {
  const { showErrorToast } = useToastNotifications()
  
  const [featuredProducts, setFeaturedProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await getProducts(undefined, undefined, undefined, 3)
        setFeaturedProducts(data)
      } catch (error) {
        showErrorToast(
          "Failed to fetch featured products",
          (error as Error).message
        )
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (!featuredProducts) {
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