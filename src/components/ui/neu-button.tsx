import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type NeuButtonVariant = 'primary' | 'ghost'

interface NeuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeuButtonVariant
}

export function NeuButton({ variant = 'primary', className, ...props }: NeuButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'neu-surface active:neu-inset min-h-11 min-w-11 rounded-xl px-5 py-3 text-sm font-medium text-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-(--neu-bg) disabled:pointer-events-none disabled:opacity-50',
        variant === 'ghost' && 'text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
