

import Home from "@/components/home"
import ProductGrid from "@/components/products"
import WhatsAppChat from "../../components/whatsappchat"

// Mock data fetching
async function getHomeData() {
  return {
    title: "FOOD BUNDLES",
    description: "Connect Your Restaurant to Our Farm.",
    secondaryButton: {
      text: "Shop As Guest →",
      href: "#products",
    },
    heroImage: {
      src: "/imgs/serving.jpg",
      alt: "Restaurant dining scene with waiter serving customers",
    },
    decorativeElements: {
      stars: {
        large: { src: "/imgs/Vector 1.png", alt: "Decorative Vector 1 star" },
        small: { src: "/imgs/Vector 1.png", alt: "Small decorative star" },
      },
    },
  };
}

// Mock products data
async function getProductsData() {
  return [
    {
      id: "1",
      productName: "Fresh Organic Tomatoes",
      unitPrice: 4.99,
      unit: "kg",
      bonus: 10,
      createdBy: "Green Farm Co.",
      expiryDate: new Date("2024-12-31"),
      images:["/imgs/farmer-market.jpg"],
      quantity: 50,
      sku: "TOM001",
      category: "VEGETABLES" as const,
      rating: 4.8,
      soldCount: 127,
    },
    {
      id: "2",
      productName: "Premium Carrots Bundle",
      unitPrice: 3.49,
      unit: "kg",
      bonus: 5,
      createdBy: "Sunrise Farms",
      expiryDate: new Date("2024-12-25"),
      images: ["/imgs/farmer-market.jpg"],
      quantity: 75,
      sku: "CAR001",
      category: "VEGETABLES" as const,
      rating: 4.6,
      soldCount: 89,
    },
    {
      id: "3",
      productName: "Fresh Lettuce Heads",
      unitPrice: 2.99,
      unit: "piece",
      bonus: 0,
      createdBy: "Valley Gardens",
      expiryDate: new Date("2024-12-20"),
      images: ["/imgs/products.jpg"],
      quantity: 30,
      sku: "LET001",
      category: "VEGETABLES" as const,
      rating: 4.5,
      soldCount: 45,
    },
    {
      id: "4",
      productName: "Organic Potatoes",
      unitPrice: 2.49,
      unit: "kg",
      bonus: 15,
      createdBy: "Mountain Harvest",
      expiryDate: new Date("2025-01-15"),
      images: ["/imgs/Tomatoes.svg"],
      quantity: 100,
      sku: "POT001",
      category: "TUBERS" as const,
      rating: 4.7,
      soldCount: 203,
    },
    {
      id: "5",
      productName: "Premium Carrots Bundle",
      unitPrice: 3.49,
      unit: "kg",
      bonus: 5,
      createdBy: "Sunrise Farms",
      expiryDate: new Date("2024-12-25"),
      images: ["/imgs/farmer-market.jpg"],
      quantity: 75,
      sku: "CAR001",
      category: "VEGETABLES" as const,
      rating: 4.6,
      soldCount: 89,
    },
    {
      id: "6",
      productName: "Premium Carrots Bundle",
      unitPrice: 3.49,
      unit: "kg",
      bonus: 5,
      createdBy: "Sunrise Farms",
      expiryDate: new Date("2024-12-25"),
      images: ["/imgs/farmer-market.jpg"],
      quantity: 75,
      sku: "CAR001",
      category: "VEGETABLES" as const,
      rating: 4.6,
      soldCount: 89,
    },
    {
      id: "7",
      productName: "Premium Carrots Bundle",
      unitPrice: 3.49,
      unit: "kg",
      bonus: 5,
      createdBy: "Sunrise Farms",
      expiryDate: new Date("2024-12-25"),
      images: ["/imgs/product2.jpg"],
      quantity: 75,
      sku: "CAR001",
      category: "VEGETABLES" as const,
      rating: 4.6,
      soldCount: 89,
    },
    {
      id: "8",
      productName: "Fresh Lettuce Heads",
      unitPrice: 2.99,
      unit: "piece",
      bonus: 0,
      createdBy: "Valley Gardens",
      expiryDate: new Date("2024-12-20"),
      images: ["/imgs/products.jpg"],
      quantity: 30,
      sku: "LET001",
      category: "VEGETABLES" as const,
      rating: 4.5,
      soldCount: 45,
    },
    {
      id: "9",
      productName: "Fresh Lettuce Heads",
      unitPrice: 2.99,
      unit: "piece",
      bonus: 0,
      createdBy: "Valley Gardens",
      expiryDate: new Date("2024-12-20"),
      images: ["/imgs/products.jpg"],
      quantity: 30,
      sku: "LET001",
      category: "VEGETABLES" as const,
      rating: 4.5,
      soldCount: 45,
    },
{
      id: "10",
      productName: "Fresh Lettuce Heads",
      unitPrice: 2.99,
      unit: "piece",
      bonus: 0,
      createdBy: "Valley Gardens",
      expiryDate: new Date("2024-12-20"),
      images: ["/imgs/products.jpg"],
      quantity: 30,
      sku: "LET001",
      category: "VEGETABLES" as const,
      rating: 4.5,
      soldCount: 45,
    },
  ]
}

// Landing Page Component
export default async function LandingPage() {
  const homeData = await getHomeData()
  const products = await getProductsData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/20 rounded-full -translate-y-32 translate-x-16"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-100/30 rounded-full translate-y-32 translate-x-16"></div>

      {/* Hero Section */}
      <Home data={homeData} />

      {/* Products Section */}
      <section
        id="products"
        className="min-h-screen py-16 px-4 max-w-7xl mx-auto flex flex-col justify-start"
      >
        <div className="text-center mb-12 pt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Products We Offer
          </h2>
        </div>
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </section>

      {/* WhatsApp Chat Icon */}
      <WhatsAppChat phoneNumber="250789109526" />
    </div>
  )
  
}
