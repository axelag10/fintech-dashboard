import StatsCards from '@/components/dashboard/stats-cards'
import OrdersTable from '@/components/orders/orders-table'

export default function HomePage() {
  return (
    <>
      <StatsCards />

      <OrdersTable />
    </>
  )
}