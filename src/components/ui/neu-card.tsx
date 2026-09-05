import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function NeuCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('neu-surface rounded-3xl p-6', className)} {...props} />
}
