'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getProducts, getCategories } from '@/lib/api'
import { Product, Category } from '@/types'
import ProductCard from '@/components/ProductCard'
import LoadingSpinner from '@/components/loading/LoadingSpinner'
import { useToastNotifications } from '@/hooks/useToastNotifications'

export default function Products() {
  const { showErrorToast } = useToastNotifications()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const data = await getProducts(searchTerm, selectedCategory ? parseInt(selectedCategory) : undefined)
      setProducts(data)
    } catch (error) {
      showErrorToast(
        'Failed to fetch products',
        (error as Error).message
      )
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      showErrorToast(
        'Failed to fetch categories',
        (error as Error).message
      )
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProducts()
  }

  const handleSelectCategory = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value)
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Product Catalogue</h1>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={selectedCategory || ''} onValueChange={handleSelectCategory}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.category_id} value={category.category_id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </form>
      {isLoading ? (
        <LoadingSpinner/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard product={product} key={product.product_id}></ProductCard>
          ))}
        </div>
      )}
    </div>
  )
}