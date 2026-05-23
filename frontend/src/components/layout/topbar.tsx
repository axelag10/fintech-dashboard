'use client'

import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ThemeToggle from './theme-toggle'

export default function Topbar() {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('token')

    router.push('/login')
  }
  return (
    <header
      className="
        bg-[#B71F3A]
        border-b
        p-4
        flex
        justify-between
        items-center
        backdrop-blur-xl

        dark:bg-slate-900/80
        sticky
        top-0
        z-50
      "
    >
      <Input
        placeholder="Buscar..."
        className="max-w-sm bg-white"
      />

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span className="font-medium text-white">
          Admin
        </span>

        <Button
          variant="outline"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  )
}