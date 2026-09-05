import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'
import type { RegistrationFormData } from '@/types/registration'

interface InputScreenProps {
  formData: RegistrationFormData
  onChange: (patch: Partial<RegistrationFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function InputScreen({ formData, onChange, onNext, onBack }: InputScreenProps) {
  return (
    <NeuCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">입력 화면 (준비 중)</h2>
        <p className="text-sm text-muted-foreground">
          전체 입력폼(품목/수량/현재채널/수수료/연락처 동의)은 #5에서 구현 예정입니다. 아래는 화면 간
          데이터 유지를 확인하기 위한 임시 필드입니다.
        </p>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        품목
        <input
          className="neu-surface focus:neu-inset rounded-xl px-4 py-3 outline-none"
          value={formData.item}
          onChange={(event) => onChange({ item: event.target.value })}
          placeholder="예: 배추"
        />
      </label>
      <div className="flex justify-between gap-3">
        <NeuButton variant="ghost" onClick={onBack}>
          이전
        </NeuButton>
        <NeuButton onClick={onNext}>다음</NeuButton>
      </div>
    </NeuCard>
  )
}
