export interface Order {
  id: number
  customer_name: string
  customer_email: string
  amount: number
  status: 'paid' | 'pending' | 'failed' | 'refunded'
  payment_method: string
  metadata: {
    bank: string
    ip: string
    country: string
    transaction_id: string
  }
  created_at: string
}