import { Link } from 'react-router-dom'
import promptsMarkdown from '../../prompts.md?raw'
import { ScreenShell } from '@/components/layout/screen-shell'
import { MarkdownDocument } from '@/components/ui/markdown-document'
import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'

export function PromptsPage() {
  return (
    <ScreenShell wide>
      <NeuCard className="flex max-h-[90svh] flex-col gap-4 overflow-y-auto">
        <Link to="/" className="self-start">
          <NeuButton variant="ghost">← 메인으로</NeuButton>
        </Link>
        <MarkdownDocument markdown={promptsMarkdown} />
      </NeuCard>
    </ScreenShell>
  )
}
