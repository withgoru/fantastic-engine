import proposalMarkdown from '../../proposal.md?raw'
import { ScreenShell } from '@/components/layout/screen-shell'
import { MarkdownDocument } from '@/components/ui/markdown-document'
import { NeuCard } from '@/components/ui/neu-card'

export function ProposalPage() {
  return (
    <ScreenShell wide>
      <NeuCard className="max-h-full overflow-y-auto">
        <MarkdownDocument markdown={proposalMarkdown} />
      </NeuCard>
    </ScreenShell>
  )
}
