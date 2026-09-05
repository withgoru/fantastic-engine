import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'
import type { RegistrationFormData } from '@/types/registration'

interface ResultScreenProps {
  formData: RegistrationFormData
  onNext: () => void
  onBack: () => void
}

export function ResultScreen({ formData, onNext, onBack }: ResultScreenProps) {
  return (
    <NeuCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">결과 화면 (준비 중)</h2>
        <p className="text-sm text-muted-foreground">
          정산 시뮬레이션 계산 로직은 #6, 결과 카드 UI(참고용 문구 포함)는 #7에서 구현 예정입니다.
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
        <NeuButton onClick={onNext}>다음</NeuButton>
      </div>
    </NeuCard>
  )
}
