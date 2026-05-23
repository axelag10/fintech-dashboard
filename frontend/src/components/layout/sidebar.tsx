'use client'

import { LayoutDashboard, CreditCard, Receipt, Settings } from 'lucide-react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

const items = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    label: 'Ordenes',
    icon: Receipt,
    href: '/',
  },
  {
    label: 'Pagos',
    icon: CreditCard,
    href: '/',
  },
  {
    label: 'Configuración',
    icon: Settings,
    href: '/',
  },
]

export default function Sidebar() {
  const NavItems = () => (
    <nav className="space-y-2">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="
            flex
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            hover:bg-[#cc6275]
            cursor-pointer
            transition
          "
        >
          <item.icon size={18} />

          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
  return (
    <>
      {/* mobile */}
      <div className="md:hidden p-4">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-[#B71F3A] text-white border-none"
          >
            <SheetTitle className="sr-only">
              Menu
            </SheetTitle>
            <div className="mt-8">
              <h1 className="text-xl font-bold mb-8">
                ORDERS && PAYMENTS
              </h1>

              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* desktop */}
      <aside
        className="
          hidden
          md:block
          w-64
          bg-[#B71F3A]
          text-white
          min-h-screen
          p-4
        "
      >
        <div className="mb-8">
          <h1 className="text-xl font-bold">
            ORDERS && PAYMENTS
          </h1>
        </div>

        <NavItems />
      </aside>
    </>
  )
}