"use client"

import { Leaf, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Header() {
  // Function to scroll to section on the same page
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50">
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
                href="/products"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                Products
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/promotions"
            
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                Promotion
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/how-it-works"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                How It Works
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="why-choose-us"
                className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                  "text-gray-700 hover:text-green-600",
                )}
              >
                About
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
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
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

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9">
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                FoodBundle
              </SheetTitle>
              <SheetDescription>Connecting farms to tables with fresh, local produce</SheetDescription>
            </SheetHeader>
            <div className="grid gap-3 py-6">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("featured-products")}
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("why-choose")}
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact-us")}
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
              >
                Contact
              </button>
              <div className="flex flex-col gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  size="default"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-full font-medium bg-transparent"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  size="default"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full font-medium"
                  asChild
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
