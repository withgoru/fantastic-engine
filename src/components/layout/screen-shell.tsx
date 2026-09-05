import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScreenShellProps {
  children: ReactNode
  /** 문서 열람 페이지처럼 표/코드블록이 있는 넓은 콘텐츠용. 기본값은 좁은 위저드 카드 폭. */
  wide?: boolean
}

/** 배경/전체 높이는 AppLayout이 담당하고, 이 컴포넌트는 콘텐츠를 중앙 정렬하는 역할만 한다. */
export function ScreenShell({ children, wide = false }: ScreenShellProps) {
  return (
    <main className="flex w-full flex-1 items-center justify-center p-4">
      <div className={cn('w-full', wide ? 'max-w-3xl' : 'max-w-sm sm:max-w-md')}>{children}</div>
    </main>
  )
}
