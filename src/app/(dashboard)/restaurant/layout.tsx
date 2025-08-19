import React from "react";
import { TopResNav } from "./_components/restaurant-top-nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RestaurantLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopResNav />
      <main className="flex-grow container mx-auto">{children}</main>
    </div>
  );
}
