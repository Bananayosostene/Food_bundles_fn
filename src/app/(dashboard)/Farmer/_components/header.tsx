"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-8 items-center pl-28 pr-18 justify-between ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, Sosten! Here what happening with your products.</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative" >
            <Bell className="w-4 h-4 " />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
           </Button>

           <Avatar className="w-12 h-12">
            <AvatarImage src="/images/Michael.svg?height=32&width=32" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
