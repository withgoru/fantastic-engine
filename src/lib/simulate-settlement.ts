import type { SimulationResult } from '@/types/registration'

/**
 * 로컬푸드 직매장 등 수수료 국정감사 자료(2023) 기준 수수료 편차 범위.
 * 실제 판매금액 데이터가 없으므로, 이 값들과 사용자의 현재 수수료율을 "단순 비교"하는
 * 수준의 규칙기반 계산만 수행한다. 시장가격·매출·순수익 관련 수치는 절대 생성하지 않는다.
 */
export const BASELINE_FEE_RATE_LOW_PERCENT = 1
export const BASELINE_FEE_RATE_HIGH_PERCENT = 20

function toSettlementRate(feeRatePercent: number): number {
  return 100 - feeRatePercent
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10
}

/**
 * currentFeeRatePercent가 null이면(사용자가 현재 수수료를 모르는 경우) 기준 범위(1~20%)를
 * 그대로 가정하고, 실제 수수료 대비 차이는 계산하지 않는다(usedAssumedRange: true).
 */
export function simulateSettlement(currentFeeRatePercent: number | null): SimulationResult {
  const baselineSettlementRateLowPercent = toSettlementRate(BASELINE_FEE_RATE_HIGH_PERCENT)
  const baselineSettlementRateHighPercent = toSettlementRate(BASELINE_FEE_RATE_LOW_PERCENT)

  const usedAssumedRange = currentFeeRatePercent === null
  const clampedFeeRatePercent =
    currentFeeRatePercent === null ? null : Math.min(100, Math.max(0, currentFeeRatePercent))
  const currentSettlementRatePercent =
    clampedFeeRatePercent === null ? null : roundToOneDecimal(toSettlementRate(clampedFeeRatePercent))

  return {
    baselineFeeRateLowPercent: BASELINE_FEE_RATE_LOW_PERCENT,
    baselineFeeRateHighPercent: BASELINE_FEE_RATE_HIGH_PERCENT,
    baselineSettlementRateLowPercent,
    baselineSettlementRateHighPercent,
    currentFeeRatePercent: clampedFeeRatePercent,
    currentSettlementRatePercent,
    usedAssumedRange,
    differenceVsBaselineLowPercentPoints:
      currentSettlementRatePercent === null
        ? null
        : roundToOneDecimal(currentSettlementRatePercent - baselineSettlementRateLowPercent),
    differenceVsBaselineHighPercentPoints:
      currentSettlementRatePercent === null
        ? null
        : roundToOneDecimal(currentSettlementRatePercent - baselineSettlementRateHighPercent),
  }
}
