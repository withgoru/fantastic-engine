import { Outlet } from 'react-router-dom'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

export function AppLayout() {
  return (
    <div className="flex min-h-svh w-full flex-col bg-(--neu-bg)">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
