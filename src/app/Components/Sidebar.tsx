'use client'
import DashboardCard from "../admin/page";

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Package, ShoppingCart, Users, Inbox, LogIn, UserPlus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {ProductCard} from "@/components/ProductCard"

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: Menu },
  { name: 'Sales', href: '/admin/sales', icon: ShoppingCart },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Inbox', href: '/admin/inbox', icon: Inbox },
  { name: 'Sign In', href: '/admin/signin', icon: LogIn },
  { name: 'Sign Up', href: '/admin/signup', icon: UserPlus },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 lg:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 lg:block">
        <SidebarContent />
      </aside>

      <main className="lg:pl-64">
        <div className="container mx-auto p-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <DashboardCard />
            </div>
          </div>
        </div>
      </main>
    </>
  )

  function SidebarContent() {
    return (
      <div className="flex h-full flex-col bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <div className="mb-4 flex items-center px-2">
          <Package className="mr-2 h-6 w-6" />
          <span className="text-lg font-semibold">E-Shop Admin</span>
        </div>
        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                pathname === item.href
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 dark:text-gray-200"
              )}
              onClick={() => setOpen(false)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
              {item.name === 'Inbox' && (
                <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    )
  }
}