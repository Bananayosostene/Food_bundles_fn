"use client"

import DashboardHeader from "./_components/header"
import StatsCards from "./_components/stats-cards"
import ProductManagement from "./_components/product-management"
import { ProductProvider } from "./_components/product-context"

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        <div className="flex-1 flex">
          {/* Dashboard Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {/* Stats Cards */}
            <StatsCards />

            <ProductProvider>
            <ProductManagement />
            </ProductProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
