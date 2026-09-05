import { useState } from 'react'
import { Field } from '@/components/ui/field'
import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'
import { NeuInput } from '@/components/ui/neu-input'
import { cn } from '@/lib/utils'
import { submitRegistrationResponse } from '@/lib/submit-registration'
import type { RegistrationFormData, RegistrationIntent } from '@/types/registration'

type SubmitStatus = 'idle' | 'submitting' | 'submitted' | 'error'

interface FeedbackScreenProps {
  formData: RegistrationFormData
  onChange: (patch: Partial<RegistrationFormData>) => void
  onBack: () => void
  onRestart: () => void
}

interface FormErrors {
  registrationIntent?: string
  actualFeeRateResponsePercent?: string
}

function validate(formData: RegistrationFormData): FormErrors {
  const errors: FormErrors = {}
  if (formData.registrationIntent === null) {
    errors.registrationIntent = '등록 의향을 선택해주세요.'
  }
  const fee = formData.actualFeeRateResponsePercent
  if (fee === null) {
    errors.actualFeeRateResponsePercent = '현재 채널의 실제 수수료(%)를 입력해주세요.'
  } else if (Number.isNaN(fee) || fee < 0 || fee > 100) {
    errors.actualFeeRateResponsePercent = '수수료는 0~100 사이 숫자로 입력해주세요.'
  }
  return errors
}

function IntentButton({
  label,
  selected,
  onSelect,
}: {
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'min-h-11 rounded-xl px-4 py-3 text-sm font-medium transition-shadow',
        selected ? 'neu-inset text-foreground' : 'neu-surface text-muted-foreground',
      )}
    >
      {label}
    </button>
  )
}

export function FeedbackScreen({ formData, onChange, onBack, onRestart }: FeedbackScreenProps) {
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleIntentSelect = (intent: RegistrationIntent) => {
    onChange({ registrationIntent: intent })
  }

  const handleFeeResponseChange = (value: string) => {
    onChange({ actualFeeRateResponsePercent: value === '' ? null : Number(value) })
  }

  const handleSubmit = async () => {
    const nextErrors = validate(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    setSubmitError(null)
    const result = await submitRegistrationResponse(formData)
    if (result.ok) {
      setStatus('submitted')
    } else {
      setStatus('error')
      setSubmitError(result.error ?? '응답 저장에 실패했습니다. 다시 시도해주세요.')
    }
  }

  if (status === 'submitted') {
    return (
      <NeuCard className="flex flex-col gap-5 text-center">
        <h1 className="text-lg font-semibold">응답이 저장됐습니다</h1>
        <p className="text-sm text-muted-foreground">
          소중한 응답 감사합니다. 남겨주신 등록 의향과 실제 수수료 응답은 이 서비스가 실제로
          필요한지 검증하는 목적으로만 활용됩니다.
        </p>
        <NeuButton onClick={onRestart}>처음으로</NeuButton>
      </NeuCard>
    )
  }

  return (
    <NeuCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">마지막으로 몇 가지만 답해주세요</h1>
        <p className="text-sm text-muted-foreground">
          앞서 보신 결과는 참고용 모의 계산입니다. 실제 등록 의향과 현재 채널의 실제 수수료를
          알려주시면 서비스 검증에 큰 도움이 됩니다.
        </p>
      </div>

      <Field label="이런 조건이라면 핫딜에 등록할 의향이 있으신가요?" error={errors.registrationIntent}>
        <div className="grid grid-cols-2 gap-3">
          <IntentButton
            label="등록 의향 있음"
            selected={formData.registrationIntent === 'yes'}
            onSelect={() => handleIntentSelect('yes')}
          />
          <IntentButton
            label="등록 의향 없음"
            selected={formData.registrationIntent === 'no'}
            onSelect={() => handleIntentSelect('no')}
          />
        </div>
      </Field>

      <Field
        label="현재 채널(로컬푸드 직매장 등)의 실제 수수료는 몇 %인가요?"
        required
        error={errors.actualFeeRateResponsePercent}
      >
        <NeuInput
          type="number"
          inputMode="decimal"
          min={0}
          max={100}
          value={formData.actualFeeRateResponsePercent ?? ''}
          onChange={(event) => handleFeeResponseChange(event.target.value)}
          placeholder="예: 15"
        />
      </Field>

      {submitError && <p className="text-xs text-destructive">{submitError}</p>}

      <div className="flex justify-between gap-3">
        <NeuButton variant="ghost" onClick={onBack} disabled={status === 'submitting'}>
          이전
        </NeuButton>
        <NeuButton onClick={handleSubmit} disabled={status === 'submitting'}>
          {status === 'submitting' ? '제출 중...' : '제출'}
        </NeuButton>
      </div>
    </NeuCard>
  )
}
