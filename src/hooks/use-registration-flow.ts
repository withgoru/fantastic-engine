import { useState } from 'react'
import {
  initialRegistrationFormData,
  type RegistrationFormData,
} from '@/types/registration'

export const REGISTRATION_STEPS = ['landing', 'input', 'result', 'feedback'] as const
export type RegistrationStep = (typeof REGISTRATION_STEPS)[number]

export function useRegistrationFlow() {
  const [step, setStep] = useState<RegistrationStep>('landing')
  const [formData, setFormData] = useState<RegistrationFormData>(initialRegistrationFormData)

  const updateFormData = (patch: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }))
  }

  const goNext = () => {
    const currentIndex = REGISTRATION_STEPS.indexOf(step)
    const next = REGISTRATION_STEPS[currentIndex + 1]
    if (next) setStep(next)
  }

  const goBack = () => {
    const currentIndex = REGISTRATION_STEPS.indexOf(step)
    const prev = REGISTRATION_STEPS[currentIndex - 1]
    if (prev) setStep(prev)
  }

  const restart = () => {
    setStep('landing')
    setFormData(initialRegistrationFormData)
  }

  return { step, formData, updateFormData, goNext, goBack, restart }
}
