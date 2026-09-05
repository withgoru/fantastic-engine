import { NeuButton } from '@/components/ui/neu-button'
import { NeuCard } from '@/components/ui/neu-card'

interface LandingScreenProps {
  onStart: () => void
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <NeuCard className="flex flex-col gap-6 text-center">
      <header className="flex flex-col gap-3">
        <h1 className="text-xl leading-snug font-semibold text-balance">
          풍작으로 가격이 급락했을 때, 로컬푸드 직매장 수수료가 매장마다 달라 답답하셨나요?
        </h1>
        <p className="text-sm text-muted-foreground">
          잉여물량을 투명하고 일정한 정산조건으로 등록해보는 시뮬레이션입니다. (참고용, 실제 계약 아님)
        </p>
      </header>
      <NeuButton onClick={onStart} autoFocus>
        시작하기
      </NeuButton>
    </NeuCard>
  )
}
