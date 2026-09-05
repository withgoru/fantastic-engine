import { useEffect, useMemo } from 'react'
import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'
import { simulateSettlement } from '@/lib/simulate-settlement'
import type { RegistrationFormData, SimulationResult } from '@/types/registration'

interface ResultScreenProps {
  formData: RegistrationFormData
  onChange: (patch: Partial<RegistrationFormData>) => void
  onNext: () => void
  onBack: () => void
}

function formatPercent(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`
}

function buildComparisonMessage(result: SimulationResult): string {
  if (result.usedAssumedRange) {
    return `현재 수수료를 입력하지 않으셔서 2023년 국정감사 자료 기준 수수료 범위(${result.baselineFeeRateLowPercent}~${result.baselineFeeRateHighPercent}%)를 그대로 가정했습니다.`
  }

  const { differenceVsBaselineLowPercentPoints: low, differenceVsBaselineHighPercentPoints: high } = result
  if (low === null || high === null) return ''

  if (low >= 0 && high <= 0) {
    return `국정감사 자료 기준 수수료 범위(${result.baselineFeeRateLowPercent}~${result.baselineFeeRateHighPercent}%, 정산율 ${formatPercent(result.baselineSettlementRateLowPercent)}~${formatPercent(result.baselineSettlementRateHighPercent)}) 안에 있는 조건입니다.`
  }
  if (high > 0) {
    return `기준 범위 중 정산율이 가장 높은 조건보다도 ${formatPercent(high)}p 높은 편입니다.`
  }
  return `기준 범위 중 정산율이 가장 낮은 조건보다도 ${formatPercent(Math.abs(low))}p 낮은 편입니다.`
}

export function ResultScreen({ formData, onChange, onNext, onBack }: ResultScreenProps) {
  const result = useMemo(
    () => simulateSettlement(formData.currentFeeRatePercent),
    [formData.currentFeeRatePercent],
  )

  useEffect(() => {
    onChange({ simulationResult: result })
    // result가 바뀔 때만 동기화 — onChange를 deps에 넣으면 매 렌더마다 재실행된다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const comparisonMessage = buildComparisonMessage(result)

  return (
    <NeuCard className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">정산 시뮬레이션 결과</h1>
        <p className="text-xs font-medium text-destructive">
          참고용 모의 계산입니다. 실제 계약조건이 아니며, 실제 결제는 이루어지지 않습니다.
        </p>
      </div>

      <div className="neu-surface rounded-2xl p-4 text-sm">
        <p className="text-muted-foreground">입력한 품목 · 수량</p>
        <p className="font-medium">
          {formData.item || '(미입력)'} · {formData.quantity || '(미입력)'}
        </p>
      </div>

      <div className="neu-surface flex flex-col gap-2 rounded-2xl p-4 text-sm">
        {result.usedAssumedRange ? (
          <p>
            예상 정산율(참고):{' '}
            <strong>
              {formatPercent(result.baselineSettlementRateLowPercent)} ~{' '}
              {formatPercent(result.baselineSettlementRateHighPercent)}
            </strong>
          </p>
        ) : (
          <p>
            입력한 수수료 {formatPercent(result.currentFeeRatePercent ?? 0)} 기준 예상 정산율(참고):{' '}
            <strong>{formatPercent(result.currentSettlementRatePercent ?? 0)}</strong>
          </p>
        )}
        <p className="text-xs text-muted-foreground">{comparisonMessage}</p>
      </div>

      <p className="text-xs text-muted-foreground">
        기준 수수료 범위 1~20%는 2023년 국정감사에서 확인된 로컬푸드 직매장 등 수수료 편차 자료이며,
        실제 정산 조건은 채널·품목·시점에 따라 달라질 수 있습니다.
      </p>

      <div className="flex justify-between gap-3">
        <NeuButton variant="ghost" onClick={onBack}>
          이전
        </NeuButton>
        <NeuButton onClick={onNext}>다음</NeuButton>
      </div>
    </NeuCard>
  )
}
