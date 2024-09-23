'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import { useToastNotifications } from '@/hooks/useToastNotifications'

type ProductProps = {
  product: Product
}
  
export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { showErrorToast, showSuccessToast } = useToastNotifications()

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

  return (
    <Card key={product.product_id}>
      <CardHeader>
        <CardTitle>
          <Link href={`/products/${product.product_id}`} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/products/${product.product_id}`}>
          <img src={`/api/products/${product.product_id}/primary-image`} alt={product.name} className="w-full h-48 object-contain mb-4 rounded-md" />
        </Link>
        <p className="text-xl font-bold">${parseFloat(product.price).toFixed(2)}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button onClick={() => handleAddToCart(product.product_id)}>Add to Cart</Button>
        <Button asChild variant="outline">
          <Link href={`/products/${product.product_id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}