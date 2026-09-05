import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function NeuInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'neu-surface focus:neu-inset w-full rounded-xl px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
