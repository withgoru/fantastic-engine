import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: '/proposal', label: '사업계획서' },
  { to: '/prompts', label: '프롬프트' },
  { to: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3">
      <NavLink
        to="/"
        className="rounded-lg text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-(--neu-bg)"
        end
      >
        잉여물량 핫딜
      </NavLink>
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
