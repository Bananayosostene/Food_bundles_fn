"use client"

import { useState } from "react";
import { Bell, User, ChevronDown, Settings, LogOut, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import NotificationsDrawer from "./notification";
import ProfileDrawer from "./ProfileDrawer";

const testNotifications = [
  {
    id: "1",
    title: "Order Initiated",
    message: "Your order with id #123-4568 has been initiated successfully",
    orderId: "#123-4568",
    timestamp: "12/12/2024 08:30 PM",
    isRead: false,
    type: "order_initiated" as const,
  },
  {
    id: "2",
    title: "Order Completed",
    message: "Your order with id #123-4568 has been completed successfully",
    orderId: "#123-4568",
    timestamp: "12/12/2024 08:30 PM",
    isRead: true,
    type: "order_completed" as const,
  },
  {
    id: "3",
    title: "Payment Received",
    message: "Payment for order #123-4568 has been received",
    orderId: "#123-4568",
    timestamp: "12/12/2024 08:30 PM",
    isRead: true,
    type: "payment_received" as const,
  },
  {
    id: "4",
    title: "Order Cancelled",
    message: "Your order with id #123-4569 has been cancelled",
    orderId: "#123-4569",
    timestamp: "12/12/2024 08:30 PM",
    isRead: false,
    type: "order_cancelled" as const,
  },
  {
    id: "5",
    title: "Order Initiated",
    message: "Your order with id #123-4570 has been initiated successfully",
    orderId: "#123-4570",
    timestamp: "12/12/2024 08:30 PM",
    isRead: false,
    type: "order_initiated" as const,
  },
];

export default function DashboardHeader() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const unreadCount = testNotifications.filter((n) => !n.isRead).length;
  const pathname = usePathname();
  const router = useRouter();
  
  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };
  
  return (
    <>
    <header className="bg-green-700 border-b border-green-200 sticky top-0 z-50 h-20 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-md ">
             <img
              src="/imgs/Food_bundle_logo.png"
              alt="FoodBundle Logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">
                Food bundles
              </span>
              <p className="text-xs text-white hidden sm:block self-end">Welcome back, Sosten!</p>
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-green-400 transition-colors duration-200"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="h-5 w-5 text-white" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-white">
                  {unreadCount}
              </Badge>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 hover:bg-green-400 transition-colors duration-200 px-3 py-2 h-auto"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-medium">E</span>
                  </div>
                  <span className="font-medium text-white hidden sm:block">Elia</span>
                  <ChevronDown className="h-4 w-4 text-white transition-transform duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 sm:w-56 hover:bg-green-100" align="end" forceMount>
                <div className="px-3 py-2 border-b border-gray-100 ">
                  <p className="text-xs text-gray-500">elia@food.rw</p>
                </div>
                <DropdownMenuItem className="cursor-pointer" onClick={handleProfileClick}>
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-green-300">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-green-300">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
     <NotificationsDrawer
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            notifications={testNotifications}
          />
     <ProfileDrawer
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
     </>
  )
}