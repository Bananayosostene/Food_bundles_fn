"use client"

import { Package, CheckCircle, Clock, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useProducts } from "./product-context"

export default function StatsCards() {
  const { getMonthlyStats } = useProducts()
  const stats = getMonthlyStats()

  // Get current month name
  const currentMonthName = new Date().toLocaleString("default", { month: "long" })

  const statsConfig = [
    {
      title: `Products This Month`,
      subtitle: `Submitted in ${currentMonthName}`,
      value: stats.totalProductsThisMonth.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: stats.totalProductsThisMonth > 0 ? "positive" : "neutral",
    },
    {
      title: `Approved This Month`,
      subtitle: `Ready for sale in ${currentMonthName}`,
      value: stats.approvedProductsThisMonth.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: stats.approvedProductsThisMonth > 0 ? "positive" : "neutral",
    },
    {
      title: `Pending This Month`,
      subtitle: `Awaiting approval in ${currentMonthName}`,
      value: stats.pendingProductsThisMonth.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      trend: stats.pendingProductsThisMonth > 0 ? "warning" : "positive",
    },
    {
      title: `Paid This Month`,
      subtitle: `Payments received in ${currentMonthName}`,
      value: stats.paidProductsThisMonth.toString(),
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: stats.paidProductsThisMonth > 0 ? "positive" : "neutral",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pl-28 pr-18 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === "positive"
                    ? "bg-green-100 text-green-700"
                    : stat.trend === "warning"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {currentMonthName}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
