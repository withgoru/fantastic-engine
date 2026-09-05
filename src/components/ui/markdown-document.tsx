import { useMemo } from 'react'
import { marked } from 'marked'

interface MarkdownDocumentProps {
  markdown: string
}

/**
 * markdown은 리포에 커밋된 정적 문서(proposal.md/prompts.md)를 빌드타임에 인라인한 것으로,
 * 사용자 입력이 아니다. dangerouslySetInnerHTML은 이 build-time 고정 콘텐츠에만 사용한다.
 */
export function MarkdownDocument({ markdown }: MarkdownDocumentProps) {
  const html = useMemo(() => marked.parse(markdown, { async: false }), [markdown])

  return (
    <div
      className="prose prose-neutral dark:prose-invert prose-sm sm:prose-base max-w-none"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
