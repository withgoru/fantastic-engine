import type { RegistrationFormData } from '@/types/registration'

const GAS_WEB_APP_URL = import.meta.env.VITE_GAS_WEB_APP_URL

export interface SubmitRegistrationResult {
  ok: boolean
  error?: string
}

function buildSimulationSummary(formData: RegistrationFormData): string | number {
  const result = formData.simulationResult
  if (!result) return ''
  if (result.usedAssumedRange) {
    return `${result.baselineSettlementRateLowPercent}~${result.baselineSettlementRateHighPercent}(가정)`
  }
  return result.currentSettlementRatePercent ?? ''
}

/**
 * Google Apps Script Web App(#9)으로 응답을 전송한다. Apps Script는 CORS preflight(OPTIONS)를
 * 처리하지 않으므로 text/plain으로 보내 프리플라이트를 발생시키지 않는다.
 */
export async function submitRegistrationResponse(
  formData: RegistrationFormData,
): Promise<SubmitRegistrationResult> {
  if (!GAS_WEB_APP_URL) {
    return { ok: false, error: '서버 연동 주소가 설정되지 않았습니다.' }
  }

  const payload = {
    item: formData.item,
    quantity: formData.quantity,
    currentChannel: formData.currentChannel,
    currentFeeRatePercent: formData.currentFeeRatePercent,
    simulationSettlementRatePercent: buildSimulationSummary(formData),
    registrationIntent: formData.registrationIntent,
    actualFeeRateResponsePercent: formData.actualFeeRateResponsePercent,
    agreedToContact: formData.agreedToContact,
    contactPhone: formData.agreedToContact ? formData.contactPhone : '',
  }

  try {
    const response = await fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      return { ok: false, error: `요청이 실패했습니다 (HTTP ${response.status}). 다시 시도해주세요.` }
    }
    const data = (await response.json()) as { ok?: boolean }
    return data.ok
      ? { ok: true }
      : { ok: false, error: '응답 저장에 실패했습니다. 다시 시도해주세요.' }
  } catch {
    return { ok: false, error: '네트워크 오류로 응답을 저장하지 못했습니다. 다시 시도해주세요.' }
  }
}
