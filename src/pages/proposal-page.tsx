import { Link } from 'react-router-dom'
import proposalMarkdown from '../../proposal.md?raw'
import { ScreenShell } from '@/components/layout/screen-shell'
import { MarkdownDocument } from '@/components/ui/markdown-document'
import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'

export function ProposalPage() {
  return (
    <ScreenShell wide>
      <NeuCard className="flex max-h-[90svh] flex-col gap-4 overflow-y-auto">
        <Link to="/" className="self-start">
          <NeuButton variant="ghost">← 메인으로</NeuButton>
        </Link>
        <MarkdownDocument markdown={proposalMarkdown} />
      </NeuCard>
    </ScreenShell>
  )
}
