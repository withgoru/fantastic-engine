export type RegistrationIntent = 'yes' | 'no'

/**
 * 실제 판매(원화) 금액 데이터가 없어(KAMIS 등 실시간 시세 연동은 구현 범위 밖) 정산액이 아닌
 * 정산율(%) 기준으로만 비교한다. 계산 로직은 src/lib/simulate-settlement.ts 참고.
 */
export interface SimulationResult {
  baselineFeeRateLowPercent: number
  baselineFeeRateHighPercent: number
  baselineSettlementRateLowPercent: number
  baselineSettlementRateHighPercent: number
  currentFeeRatePercent: number | null
  currentSettlementRatePercent: number | null
  usedAssumedRange: boolean
  differenceVsBaselineLowPercentPoints: number | null
  differenceVsBaselineHighPercentPoints: number | null
}

export interface RegistrationFormData {
  item: string
  quantity: string
  currentChannel: string
  currentFeeRatePercent: number | null
  contactPhone: string
  agreedToContact: boolean
  simulationResult: SimulationResult | null
  registrationIntent: RegistrationIntent | null
  actualFeeRateResponsePercent: number | null
}

export const initialRegistrationFormData: RegistrationFormData = {
  item: '',
  quantity: '',
  currentChannel: '',
  currentFeeRatePercent: null,
  contactPhone: '',
  agreedToContact: false,
  simulationResult: null,
  registrationIntent: null,
  actualFeeRateResponsePercent: null,
}
