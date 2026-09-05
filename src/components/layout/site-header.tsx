import type { MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/proposal', label: '사업계획서' },
  { to: '/prompts', label: '프롬프트' },
  { to: '/contact', label: 'Contact' },
]

const HOME_URL = 'https://withgoru.github.io/fantastic-engine/'

/**
 * 홈으로 가는 SPA 라우팅(NavLink)이 아니라 항상 완전한 새로고침으로 이동시킨다.
 * 이미 홈에 있을 때 클릭해도(해시만 다르거나 완전히 같은 URL이라 location.href 대입만으로는
 * 브라우저가 리로드를 생략할 수 있어) location.reload()로 명시적으로 강제한다.
 */
function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  if (window.location.href === HOME_URL) {
    window.location.reload()
  } else {
    window.location.href = HOME_URL
  }
}

export function SiteHeader() {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3">
      <a
        href={HOME_URL}
        onClick={handleBrandClick}
        className="rounded-lg text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-(--neu-bg)"
      >
        웨더테이블
      </a>
      <nav className="flex flex-wrap gap-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'neu-surface active:neu-inset min-h-9 rounded-lg px-3 py-1.5 text-xs font-medium transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-(--neu-bg)',
                isActive ? 'neu-inset text-foreground' : 'text-muted-foreground',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
