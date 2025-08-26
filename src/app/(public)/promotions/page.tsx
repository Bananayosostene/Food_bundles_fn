import { Promotions } from "@/components/promotion"
import { Footer } from "@/components/footer"

// Sample data for the Promotions component
const PromotionsData = {
  title: "Special Offers",
  products: [
    {
      id: "promo-001",
      productName: "Organic Tomatoes Bundle",
      description: "Fresh, juicy organic tomatoes perfect for salads, cooking, and snacking. Grown without pesticides using sustainable farming practices.",
      unitPrice: 4.99,
      originalPrice: 7.99,
      discountPercentage: 38,
      unit: "lb",
      quantity: 25,
      images: ["/api/placeholder/200/200"],
      farmName: "Green Valley Farms",
      category: "Vegetables",
      sku: "ORG-TOM-001"
    },
    {
      id: "promo-002",
      productName: "Premium Avocados",
      description: "Creamy, perfectly ripe avocados sourced from local orchards. Rich in healthy fats and perfect for toast, guacamole, or smoothies.",
      unitPrice: 2.49,
      originalPrice: 3.99,
      discountPercentage: 38,
      unit: "each",
      quantity: 50,
      images: ["/api/placeholder/200/200"],
      farmName: "Sunset Orchards",
      category: "Fruits",
      sku: "PREM-AVO-002"
    },
    {
      id: "promo-003",
      productName: "Mixed Berry Box",
      description: "A delicious mix of strawberries, blueberries, and raspberries. Perfect for breakfast, desserts, or healthy snacking.",
      unitPrice: 8.99,
      originalPrice: 12.99,
      discountPercentage: 31,
      unit: "box",
      quantity: 15,
      images: ["/api/placeholder/200/200"],
      farmName: "Berry Hill Farm",
      category: "Fruits",
      sku: "MIX-BER-003"
    },
    {
      id: "promo-004",
      productName: "Fresh Spinach Leaves",
      description: "Tender, nutrient-rich spinach leaves perfect for salads, smoothies, and cooking. Packed with iron and vitamins.",
      unitPrice: 3.49,
      originalPrice: 4.99,
      discountPercentage: 30,
      unit: "bunch",
      quantity: 30,
      images: ["/api/placeholder/200/200"],
      farmName: "Leafy Greens Co.",
      category: "Leafy Greens",
      sku: "FRESH-SPN-004"
    }
  ]
}

export default function PromotionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Promotions data={PromotionsData}/>
      </main>
      {/* <Footer /> */}
    </div>
  )
}