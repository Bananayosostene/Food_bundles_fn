import { User, Search, Utensils } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 px-8 py-16 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Our platform streamlines the process from farm to restaurant, making local sourcing simple, efficient and
            reliable.
          </p>
        </div>

        {/* Three Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1: Farmers Submit Products */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Farmers Submit Products</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Local farmers list their available produce with details like quantity, price, and harvest dates.
            </p>
          </div>

          {/* Step 2: Browse Quality Produce */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Browse Quality Produce</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Restaurants browse through a curated marketplace of fresh, local ingredients from verified farms.
            </p>
          </div>

          {/* Step 3: Fast Restaurant Delivery */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Fast Restaurant Delivery</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Scheduled deliveries ensure restaurants receive fresh ingredients exactly when they need them.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
