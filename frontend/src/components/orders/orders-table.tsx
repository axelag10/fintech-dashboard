'use client'

import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/services/orders'
import StatusBadge from './status-badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

export default function OrdersTable() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['orders', debouncedSearch, status],
    queryFn: () =>
        getOrders({
            search: debouncedSearch,
            status,
        }),
  })
  const orders = data?.data ?? []

  // if (!data.data.length) {
  //     return (
  //         <div
  //         className="
  //             bg-white
  //             rounded-xl
  //             border
  //             p-12
  //             text-center
  //             mt-6
  //         "
  //         >
  //         <h3 className="text-lg font-semibold">
  //             No orders found
  //         </h3>

  //         <p className="text-gray-500 mt-2">
  //             Try adjusting your filters.
  //         </p>
  //         </div>
  //     )
  // }
  return (
    <div className="bg-white rounded-xl border mt-6">
        <div className="flex gap-4 mb-4 my-4 mx-2">
            <Input
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) =>
                setSearch(e.target.value)
                }
                className="max-w-sm"
            />

            <Select
                onValueChange={setStatus}
            >
                <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                <SelectItem value="all">
                    Ver todo
                </SelectItem>
                <SelectItem value="paid">
                    Pagado
                </SelectItem>

                <SelectItem value="pending">
                    Pendiente
                </SelectItem>

                <SelectItem value="failed">
                    Fallido
                </SelectItem>

                <SelectItem value="refunded">
                    Reintegrado
                </SelectItem>
                </SelectContent>
            </Select>
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pago</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={7}>
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ))
          ) : orders.length ? (
            orders.map((order: any) => (
              <TableRow
                key={order.id}
                className="
                  cursor-pointer
                  hover:bg-gray-50
                  transition
                "
                onClick={() =>
                  router.push(`/orders/${order.id}`)
                }
              >
                <TableCell>
                  #{order.id}
                </TableCell>

                <TableCell>
                  {order.customer_name}
                </TableCell>

                <TableCell>
                  {order.customer_email}
                </TableCell>

                <TableCell>
                  {new Intl.NumberFormat(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD',
                    }
                  ).format(order.amount)}
                </TableCell>

                <TableCell>
                  <StatusBadge
                    status={order.status}
                  />
                </TableCell>

                <TableCell>
                  {order.payment_method}
                </TableCell>

                <TableCell>
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center h-32"
              >
                <div>
                  <h3 className="font-semibold">
                    No orders found
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Try adjusting filters
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}