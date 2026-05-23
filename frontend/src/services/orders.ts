import { api } from './api'

export const getOrders = async (
  params?: Record<string, string>
) => {
  const response = await api.get('/orders', {
    params,
  })

  return response.data
}

export const getMetrics = async () => {
  const response = await api.get(
    '/dashboard/metrics'
  )

  return response.data
}

export const getOrder = async (
  id: string
) => {
  const response = await api.get(
    `/orders/${id}`
  )

  return response.data
}