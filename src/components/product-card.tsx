"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Plus, Minus } from "lucide-react"

type ProductCategory = "VEGETABLES" | "FRUITS" | "GRAINS" | "TUBERS" | "LEGUMES" | "HERBS_SPICES"

type Product = {
  id: string
  productName: string
  unitPrice: number
  unit: string
  createdBy: string
  expiryDate: Date
  images: string[]
  quantity: number
  sku: string
  category: ProductCategory
  rating: number
  soldCount: number
}

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const [cartQuantity, setCartQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getSafeImageUrl = (url: string) => {
    if (!url || imageError) {
      return "/placeholder.svg?height=200&width=200&text=Product+Image"
    }
    return url
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Add to cart logic here
    const cartItem = {
      id: product.id,
      name: product.productName,
      price: product.unitPrice,
      quantity: cartQuantity || 1,
      image: product.images[0] || "/placeholder.svg?height=200&width=200",
      unit: product.unit,
    }

    // Store in localStorage for now
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += cartQuantity || 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))
    setCartQuantity(1)
    setIsLoading(false)
  }

  const incrementQuantity = () => {
    setCartQuantity((prev) => Math.min(prev + 1, product.quantity))
  }

  const decrementQuantity = () => {
    setCartQuantity((prev) => Math.max(prev - 1, 0))
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={getSafeImageUrl(product.images[0]) || "/placeholder.svg"}
          alt={product.productName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
       
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-sm">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{product.rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.productName}</h3>
          <p className="text-sm text-muted-foreground">
            {product.soldCount} sold • {product.quantity} available
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-green-600">${product.unitPrice}</span>
              <span className="text-sm text-muted-foreground">/{product.unit}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {product.category.replace("_", " ")}
            </Badge>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={decrementQuantity}
                disabled={cartQuantity <= 0}
                className="h-8 w-8 p-0"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{cartQuantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={incrementQuantity}
                disabled={cartQuantity >= product.quantity}
                className="h-8 w-8 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={cartQuantity === 0 || isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
