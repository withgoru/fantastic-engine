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
        'neu-surface active:neu-inset rounded-xl px-5 py-3 text-sm font-medium text-foreground transition-shadow',
        variant === 'ghost' && 'text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
