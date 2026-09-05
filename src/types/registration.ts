export type RegistrationIntent = 'yes' | 'no'

// 실제 계산 로직은 #6에서 구현. 여기서는 화면 간에 주고받을 데이터 모양만 정의한다.
export interface SimulationResult {
  estimatedAmountLowKrw: number
  estimatedAmountHighKrw: number
  baselineFeeRateLowPercent: number
  baselineFeeRateHighPercent: number
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
