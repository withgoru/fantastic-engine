import type { ReactNode } from 'react'

export function ScreenShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[var(--neu-bg)] p-4">
      <div className="w-full max-w-sm sm:max-w-md">{children}</div>
    </div>
  )
}
