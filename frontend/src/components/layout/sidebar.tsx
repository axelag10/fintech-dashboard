'use client'

import { LayoutDashboard, CreditCard, Receipt, Settings } from 'lucide-react'
import Link from 'next/link'

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
  return (
    <aside className="w-64 bg-[#B71F3A] text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          ORDERS && PAYMENTS
        </h1>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.label}
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
    </aside>
  )
}