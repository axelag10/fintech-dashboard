import { Input } from '@/components/ui/input'

export default function Topbar() {
  return (
    <header
      className="
        bg-[#B71F3A]
        border-b
        p-4
        flex
        justify-between
        items-center
      "
    >
      <Input
        placeholder="Buscar..."
        className="max-w-sm bg-white"
      />

      <div className="font-medium text-white">
        Admin
      </div>
    </header>
  )
}