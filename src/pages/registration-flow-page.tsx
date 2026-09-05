import { Link } from 'react-router-dom'
import { ScreenShell } from '@/components/layout/screen-shell'
import { NeuButton } from '@/components/ui/neu-button'
import { useRegistrationFlow } from '@/hooks/use-registration-flow'
import { FeedbackScreen } from '@/screens/feedback-screen'
import { InputScreen } from '@/screens/input-screen'
import { LandingScreen } from '@/screens/landing-screen'
import { ResultScreen } from '@/screens/result-screen'

export function RegistrationFlowPage() {
  const { step, formData, updateFormData, goNext, goBack, restart } = useRegistrationFlow()

  return (
    <ScreenShell>
      <div className="mb-4 flex justify-center gap-3">
        <Link to="/proposal">
          <NeuButton variant="ghost">사업계획서 보기</NeuButton>
        </Link>
        <Link to="/prompts">
          <NeuButton variant="ghost">프롬프트 보기</NeuButton>
        </Link>
      </div>

      {step === 'landing' && <LandingScreen onStart={goNext} />}
      {step === 'input' && (
        <InputScreen
          formData={formData}
          onChange={updateFormData}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {step === 'result' && (
        <ResultScreen
          formData={formData}
          onChange={updateFormData}
          onNext={goNext}
          onBack={goBack}
        />
      )}
      {step === 'feedback' && (
        <FeedbackScreen
          formData={formData}
          onChange={updateFormData}
          onBack={goBack}
          onRestart={restart}
        />
      )}
    </ScreenShell>
  )
}
