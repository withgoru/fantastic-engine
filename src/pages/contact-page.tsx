import { ScreenShell } from '@/components/layout/screen-shell'
import { NeuCard } from '@/components/ui/neu-card'

const CONTACT_EMAIL = 'fromgoru@gmail.com'

export function ContactPage() {
  return (
    <ScreenShell>
      <NeuCard className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Contact</h1>
        <p className="text-sm text-muted-foreground">
          문의사항은 이메일로 연락해주세요.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="neu-surface active:neu-inset min-h-11 rounded-xl px-4 py-3 text-center text-sm font-medium text-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-(--neu-bg)"
        >
          {CONTACT_EMAIL}
        </a>
      </NeuCard>
    </ScreenShell>
  )
}
