"use client"

import { Leaf, Menu, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Header() {

    const [cartCount, setCartCount] = useState(0)

  // ← CHANGED: load cart count from localStorage on mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0))
  }, [])

  // Function to scroll to section on the same page
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
        {/* Logo */}
        <Link href=" " className="flex items-center gap-2 flex-shrink-0">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-600 rounded-sm flex items-center justify-center">
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-semibold text-gray-900">FoodBundle</span>
        </Link>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex items-center gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
          
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/login"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                Restaurants
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/why_choose"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                Our Offer
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/getSupport"
               
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                Get Support
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">

           <div className="relative cursor-pointer">
            <ShoppingCart className="w-8 h-8 text-gray-700 hover:text-green-600" />
            {cartCount > 0 && ( // only show if cart > 0
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-full font-medium bg-transparent text-xs lg:text-sm px-3 lg:px-4"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full font-medium text-xs lg:text-sm px-3 lg:px-4"
            asChild
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
