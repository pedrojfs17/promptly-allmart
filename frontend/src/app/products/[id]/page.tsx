'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { getProduct } from '@/lib/api'
import { Product } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const data = await getProduct(parseInt(id as string))
        setProduct(data)
      } catch (err) {
        setError('Failed to load product. Please try again later.')
        console.error('Error fetching product:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (!product) return;

    try {
      await addToCart({ product_id: product.product_id, quantity: 1 })
      console.log('Product added to cart successfully')
    } catch (error) {
      console.error('Failed to add product to cart:', error)
    }
  }

  if (isLoading) {
    return <div className="text-center mt-8">Loading product...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  if (!product) {
    return <div className="text-center mt-8">Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          <div>
            <img 
              src={`/api/products/${product.product_id}/primary-image`}
              alt={product.name} 
              className="w-full h-auto object-contain rounded-lg shadow-md"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-bold">${parseFloat(product.price).toFixed(2)}</p>
            <p className="text-sm text-gray-500">In stock: {product.inventory_count}</p>
            {product.category && (
              <p className="text-sm text-gray-500">Category: {product.category.name}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleAddToCart} size="lg">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}