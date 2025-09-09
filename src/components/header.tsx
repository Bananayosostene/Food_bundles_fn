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
import Image from "next/image"

export default function Header() {
  // Function to scroll to section on the same page
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="flex">
        {/* Logo section with white background */}
        <div className="flex items-center gap-3 bg-green-50 px-4 py-3 border-2 border-primary">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-26%20at%2017.19.27_37ef906c.jpg-5w6VIINuFETMhj8U6ktDEnUViMPQod.jpeg"
              alt="FoodBundle Logo"
              width={32}
              height={32}
              className="rounded"
            />
          </div>
          <span className="text-xl font-bold text-black">FoodBundles</span>
        </div>

      {/* Desktop Navigation Menu */}
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                "text-gray-700 hover:text-green-600",
              )}
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#featured-products"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("featured-products")
              }}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                "text-gray-700 hover:text-green-600",
              )}
            >
              Products
        </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#Promotions"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("Promotion")
              }}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                "text-gray-700 hover:text-green-600",
              )}
            >
              Promotion
            </NavigationMenuLink>
          </NavigationMenuItem>
           <NavigationMenuItem>
            <NavigationMenuLink
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("how-it-works")
              }}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                "text-gray-700 hover:text-green-600",
              )}
            >
              How It Works
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#why-choose"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("why-choose")
              }}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                "text-gray-700 hover:text-green-600",
              )}
            >
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="#contact-us"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact-us")
              }}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                "text-gray-700 hover:text-green-600",
              )}
            >
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#home"
                className="hover:text-secondary transition-colors text-2xs"
              >
                Home
              </a>
              <a
                href="#ai-assistant"
                className="hover:text-secondary transition-colors text-2xs"
              >
                Quick Talk
              </a>
              <a
                href="#restaurants"
                className="hover:text-secondary transition-colors text-2xs"
              >
                Shop
              </a>
            </nav>

            {/* Right actions */}
            <div className="flex-1 flex justify-end items-center gap-2">
              <div className="hidden md:block">
                <Link className="text-2xs" href="/login">
                <Button variant="secondary" size="sm" className="bg-green-50 text-2xs">
                  Login
                </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              FoodBundle
            </SheetTitle>
            <SheetDescription>Connecting farms to tables with fresh, local produce</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-6">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center py-2 text-lg font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("featured-products")}
              className="flex items-center py-2 text-lg font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="flex items-center py-2 text-lg font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("why-choose")}
              className="flex items-center py-2 text-lg font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact-us")}
              className="flex items-center py-2 text-lg font-medium text-gray-700 hover:text-green-600 transition-colors text-left"
            >
              Contact
            </button>
            <div className="flex flex-col gap-3 pt-6 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-primary-foreground/20 px-4">
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href="#home"
                  className="hover:text-secondary transition-colors"
                >
                  home
                </a>
                <a
                  href="#ai-assistant"
                  className="hover:text-secondary transition-colors"
                >
                  Quick Talk
                </a>
                <a
                  href="#products"
                  className="hover:text-secondary transition-colors"
                >
                  shop
                </a>
                <Button variant="secondary" size="sm" className="w-fit">
                  Login
                </Button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
