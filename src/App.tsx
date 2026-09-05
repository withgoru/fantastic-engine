import { ScreenShell } from '@/components/layout/screen-shell'
import { useRegistrationFlow } from '@/hooks/use-registration-flow'
import { FeedbackScreen } from '@/screens/feedback-screen'
import { InputScreen } from '@/screens/input-screen'
import { LandingScreen } from '@/screens/landing-screen'
import { ResultScreen } from '@/screens/result-screen'

function App() {
  const { step, formData, updateFormData, goNext, goBack, restart } = useRegistrationFlow()

  return (
    <ScreenShell>
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

export default App
