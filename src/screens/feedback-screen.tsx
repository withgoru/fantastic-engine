import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'
import type { RegistrationFormData } from '@/types/registration'

interface FeedbackScreenProps {
  formData: RegistrationFormData
  onBack: () => void
  onRestart: () => void
}

export function FeedbackScreen({ formData, onBack, onRestart }: FeedbackScreenProps) {
  return (
    <NeuCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">피드백 화면 (준비 중)</h2>
        <p className="text-sm text-muted-foreground">
          등록의향(Y/N) 및 실제 수수료 응답 UI는 #8에서 구현 예정입니다.
        </p>
      </div>
      <div className="neu-surface rounded-xl p-4 text-sm">
        <p>
          입력한 품목: <strong>{formData.item || '(미입력)'}</strong>
        </p>
      </div>
      <div className="flex justify-between gap-3">
        <NeuButton variant="ghost" onClick={onBack}>
          이전
        </NeuButton>
        <NeuButton onClick={onRestart}>처음으로</NeuButton>
      </div>
    </NeuCard>
  )
}
