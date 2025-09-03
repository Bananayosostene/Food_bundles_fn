"use client"

import { Bell, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 xl:px-16 py-4 sm:py-6 lg:py-8">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">Farmer Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 hidden sm:block lg:block">
            Welcome back, Sosten! Here what happening with your products.
          </p>
          <p className="text-sm text-gray-600 mt-1 block sm:hidden">Welcome back, Sosten!</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-4">
          <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                  <AvatarImage src="/images/Michael.svg?height=32&width=32" />
                  <AvatarFallback className="text-xs sm:text-sm">BS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 sm:w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
