'use client'

import { useQuery } from '@tanstack/react-query'
import { getMetrics } from '@/services/orders'
import { Card, CardContent } from '@/components/ui/card'

export default function StatsCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: getMetrics,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-32" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">
            Ordenes totales
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {data.total_orders}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">
            Ingresos
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {new Intl.NumberFormat(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD',
                    }
                  ).format(data.total_revenue)}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">
            Pagos fallidos
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {data.failed_payments}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-gray-500">
            Pagos pendientes
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {data.pending_payments}
          </h2>
        </CardContent>
      </Card>
    </div>
  )
}