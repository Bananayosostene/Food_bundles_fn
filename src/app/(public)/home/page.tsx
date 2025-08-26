import Home from "@/components/home"
import { Footer } from "@/components/footer"

// Sample data for the Home component
const HomeData = {
  title: "Fresh Produce Delivered Daily",
  subtitle: "Food Bundles ",
  description: "Get the freshest fruits and vegetables delivered straight to your door. Supporting local farmers and bringing you the best quality produce every day.",
  primaryButton: {
    text: "Shop Now",
    href: "/shop"
  },
  secondaryButton: {
    text: "Learn More",
    href: "/about"
  },
  heroImage: {
    src: "/api/placeholder/400/400",
    alt: "Fresh mixed vegetables and fruits"
  },
  decorativeElements: {
    stars: {
      large: { 
        src: "/api/placeholder/80/80", 
        alt: "Large decorative star" 
      },
      small: { 
        src: "/api/placeholder/40/40", 
        alt: "Small decorative star" 
      }
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Home data={HomeData} />
      </main>
      {/* <Footer /> */}
    </div>
  )
}