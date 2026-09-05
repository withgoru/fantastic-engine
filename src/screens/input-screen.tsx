import { useState } from 'react'
import { AutocompleteInput } from '@/components/ui/autocomplete-input'
import { Field } from '@/components/ui/field'
import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'
import { NeuInput } from '@/components/ui/neu-input'
import { PRODUCE_ITEMS } from '@/lib/produce-items'
import type { RegistrationFormData } from '@/types/registration'

interface InputScreenProps {
  formData: RegistrationFormData
  onChange: (patch: Partial<RegistrationFormData>) => void
  onNext: () => void
  onBack: () => void
}

interface FormErrors {
  item?: string
  quantity?: string
  currentChannel?: string
  currentFeeRatePercent?: string
  contactPhone?: string
}

function validate(formData: RegistrationFormData): FormErrors {
  const errors: FormErrors = {}
  if (!formData.item.trim()) errors.item = '품목을 입력해주세요.'
  if (!formData.quantity.trim()) errors.quantity = '수량을 입력해주세요.'
  if (!formData.currentChannel.trim()) errors.currentChannel = '현재 출하채널을 입력해주세요.'
  if (
    formData.currentFeeRatePercent !== null &&
    (Number.isNaN(formData.currentFeeRatePercent) ||
      formData.currentFeeRatePercent < 0 ||
      formData.currentFeeRatePercent > 100)
  ) {
    errors.currentFeeRatePercent = '수수료는 0~100 사이 숫자로 입력해주세요.'
  }
  if (formData.agreedToContact && !formData.contactPhone.trim()) {
    errors.contactPhone = '연락처를 입력하거나 동의를 해제해주세요.'
  }
  return errors
}

export function InputScreen({ formData, onChange, onNext, onBack }: InputScreenProps) {
  const [errors, setErrors] = useState<FormErrors>({})

  const handleFeeRateChange = (value: string) => {
    if (value === '') {
      onChange({ currentFeeRatePercent: null })
      return
    }
    onChange({ currentFeeRatePercent: Number(value) })
  }

  const handleAgreeToggle = (checked: boolean) => {
    onChange({ agreedToContact: checked, contactPhone: checked ? formData.contactPhone : '' })
  }

  const handleNext = () => {
    const nextErrors = validate(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onNext()
    }
  }

  return (
    <NeuCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">잉여물량 등록 정보 입력</h1>
        <p className="text-sm text-muted-foreground">
          품목, 수량, 현재 출하채널 정보를 입력하면 정산 시뮬레이션(참고용)을 보여드립니다.
        </p>
      </div>

      <Field label="품목" required error={errors.item}>
        <AutocompleteInput
          value={formData.item}
          onChange={(value) => onChange({ item: value })}
          suggestions={PRODUCE_ITEMS}
          placeholder="예: 배추"
        />
      </Field>

      <Field label="수량" required error={errors.quantity}>
        <NeuInput
          value={formData.quantity}
          onChange={(event) => onChange({ quantity: event.target.value })}
          placeholder="예: 500kg"
        />
      </Field>

      <Field label="현재 출하채널" required error={errors.currentChannel}>
        <NeuInput
          value={formData.currentChannel}
          onChange={(event) => onChange({ currentChannel: event.target.value })}
          placeholder="예: OO 로컬푸드 직매장"
        />
      </Field>

      <Field label="현재 수수료 (%, 선택)" error={errors.currentFeeRatePercent}>
        <NeuInput
          type="number"
          inputMode="decimal"
          min={0}
          max={100}
          value={formData.currentFeeRatePercent ?? ''}
          onChange={(event) => handleFeeRateChange(event.target.value)}
          placeholder="모르면 비워두세요"
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0"
            checked={formData.agreedToContact}
            onChange={(event) => handleAgreeToggle(event.target.checked)}
          />
          <span className="text-muted-foreground">
            연락처를 남기고 후속 확인 연락을 받겠습니다. (선택 — 남기신 연락처는 이 시뮬레이션 결과에
            대한 후속 확인 연락 목적으로만 사용됩니다)
          </span>
        </label>
        {formData.agreedToContact && (
          <Field label="연락처" required error={errors.contactPhone}>
            <NeuInput
              type="tel"
              value={formData.contactPhone}
              onChange={(event) => onChange({ contactPhone: event.target.value })}
              placeholder="010-0000-0000"
            />
          </Field>
        )}
      </div>

      <div className="flex justify-between gap-3">
        <NeuButton variant="ghost" onClick={onBack}>
          이전
        </NeuButton>
        <NeuButton onClick={handleNext}>다음</NeuButton>
      </div>
    </NeuCard>
  )
}
