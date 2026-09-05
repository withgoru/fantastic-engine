import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScreenShellProps {
  children: ReactNode
  /** 문서 열람 페이지처럼 표/코드블록이 있는 넓은 콘텐츠용. 기본값은 좁은 위저드 카드 폭. */
  wide?: boolean
}

export function ScreenShell({ children, wide = false }: ScreenShellProps) {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-(--neu-bg) p-4">
      <div className={cn('w-full', wide ? 'max-w-3xl' : 'max-w-sm sm:max-w-md')}>{children}</div>
    </main>
  )
}
