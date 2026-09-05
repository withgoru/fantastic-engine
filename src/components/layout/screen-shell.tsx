import type { ReactNode } from 'react'

export function ScreenShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-(--neu-bg) p-4">
      <div className="w-full max-w-sm sm:max-w-md">{children}</div>
    </main>
  )
}
