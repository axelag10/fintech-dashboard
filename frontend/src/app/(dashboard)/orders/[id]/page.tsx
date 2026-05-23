'use client'

import { use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getOrder } from '@/services/orders'
import { Card, CardContent } from '@/components/ui/card'
import StatusBadge from '@/components/orders/status-badge'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default function OrderDetailPage({
  params,
}: Props) {
  const { id } = use(params)

  const { data, isLoading } = useQuery({
    queryKey: ['order', id],

    queryFn: () => getOrder(id),
  })

  const order = data?.data

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/">
        <Button
          variant="outline"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />

          Regresar al Dashboard
        </Button>
      </Link>
      <div>
        <h1 className="text-3xl font-bold">
          Orden #{order.id}
        </h1>

        <p className="text-gray-500">
          Detalles de transacción
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              Cliente
            </p>

            <h2 className="font-semibold">
              {order.customer_name}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <h2 className="font-semibold">
              {order.customer_email}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Monto
            </p>

            <h2 className="font-semibold">
              ${order.amount}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <StatusBadge
              status={order.status}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 