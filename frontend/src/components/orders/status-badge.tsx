import { Badge } from '@/components/ui/badge'

interface Props {
  status: string
}

const styles = {
  paid: 'bg-green-500',
  pending: 'bg-yellow-500',
  failed: 'bg-red-500',
  refunded: 'bg-gray-500',
}

export default function StatusBadge({
  status,
}: Props) {
  return (
    <Badge
      className={
        styles[
          status as keyof typeof styles
        ]
      }
    >
      {status}
    </Badge>
  )
}