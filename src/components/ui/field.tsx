import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

export function Field({ label, required, error, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  )
}
