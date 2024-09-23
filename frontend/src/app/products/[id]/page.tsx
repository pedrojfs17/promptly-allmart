'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { getProduct } from '@/lib/api'
import { Product } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import LoadingSpinner from '@/components/loading/LoadingSpinner'
import { useToastNotifications } from '@/hooks/useToastNotifications'

export default function ProductPage() {
  const router = useRouter()
  const { id } = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { showErrorToast, showSuccessToast } = useToastNotifications()

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(parseInt(id as string))
        setProduct(data)
      } catch (error) {
        showErrorToast(
          "Failed to load product",
          (error as Error).message
        )
        router.push('/')
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = async (product_id: number) => {
    if (!user) {
      router.push('/login')
      return
    }

    try {
      await addToCart({ product_id, quantity: 1 })
      showSuccessToast(
        "Product added to cart successfully",
        "Product has been added to cart."
      )
    } catch (error) {
      showErrorToast(
        "Failed to add product to cart",
        (error as Error).message
      )
    }
  }
  
  if (!product) {
    return <LoadingSpinner/>
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
          <Button onClick={() => handleAddToCart(product.product_id)} size="lg">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}