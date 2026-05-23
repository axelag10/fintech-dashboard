import Sidebar from '@/components/layout/sidebar'
import Topbar from '@/components/layout/topbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex">
      <Sidebar />

      <section className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />

        <div className="p-6">
          {children}
        </div>
      </section>
    </main>
  )
}