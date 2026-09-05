# 웨더테이블

이상기후·풍작으로 가격이 급락한 노지 농산물 재배 농가를 위해, 기존 유통채널(로컬푸드 직매장 등)의 불투명하고 편차가 큰 수수료·정산 구조 대신, 투명하고 일정한 정산조건의 온라인 핫딜 직거래로 잉여물량을 처리할 수 있는지 검증하는 MVP입니다.

이 MVP는 "농가가 사전에 투명하고 고정된 정산조건을 접했을 때 등록 의향을 보이는가?"를 확인하는 것이 목적이며, 실제 결제·매칭·계약 체결 기능은 포함하지 않습니다.

배포된 사이트: **https://withgoru.github.io/fantastic-engine/**

## 핵심 플로우 (4화면)

1. **랜딩** — 문제 제기 카피 확인 후 "시작하기"
2. **입력** — 품목·수량·현재 출하채널·현재 수수료(선택) 입력, 연락처는 별도 동의 체크 시에만 수집
3. **결과** — 국정감사 자료 기준 수수료 범위(1~20%)와 비교한 정산율 참고치 표시 (참고용, 실제 계약조건 아님을 항상 명시)
4. **피드백** — 등록 의향(Y/N)과 실제 수수료 응답 수집, 완료 메시지 표시

> 실제 판매금액(원화) 데이터가 없어 "예상 정산액" 대신 **정산율(100% − 수수료율)** 을 기준 범위와 단순 비교하는 규칙기반 계산만 수행합니다. LLM 호출 없이 순수 계산 함수로 구현되어 있습니다 (`src/lib/simulate-settlement.ts`).

## 그 외 페이지

헤더에서 언제든 이동할 수 있습니다.

- **사업계획서** (`/proposal`) — `proposal.md`
- **프롬프트** (`/prompts`) — 아이디어 구조화부터 최종 가치제안까지의 리서치 프롬프트/응답 로그, `prompts.md`
- **Contact** (`/contact`) — 문의 메일 링크

두 문서는 빌드타임에 인라인되어 렌더링되며, 별도의 다운로드 가능한 정적 파일로는 노출되지 않습니다.

## 데이터 저장

별도 DB 없이 Google Apps Script Web App을 통해 Google Sheets에 응답을 저장합니다.

- 프론트엔드 연동: `src/lib/submit-registration.ts`
- Apps Script 소스(사용자가 직접 Apps Script 편집기에 붙여넣고 재배포해야 함): `google-apps-script/Code.gs`, 절차는 `google-apps-script/README.md` 참고
- 로컬 개발 시 `.env.example`을 `.env.local`로 복사해 `VITE_GAS_WEB_APP_URL`을 채워야 제출 기능이 동작합니다. 배포 환경에서는 동일한 이름의 GitHub Actions repo secret을 사용합니다.

## 기술 스택

- **프론트엔드**: Vite + React + TypeScript, 정적 SPA (빌드 결과가 `index.html`로 바로 서빙)
- **스타일**: Tailwind CSS v4 + shadcn/ui, 자체 Neumorphism 디자인 언어(soft embossed/debossed shadow), mobile-first
- **라우팅**: react-router-dom `HashRouter` (GitHub Pages 정적 호스팅에서 서버 리라이트 없이 딥링크가 깨지지 않도록)
- **문서 렌더링**: `marked` + `@tailwindcss/typography`
- **테스트**: Vitest (단위), Playwright(수동 검증에 사용, devDependency로는 상시 포함하지 않음)
- **배포**: GitHub Actions → GitHub Pages

## 개발

```bash
npm install
cp .env.example .env.local   # VITE_GAS_WEB_APP_URL 채우기
npm run dev                  # http://localhost:5173
```

```bash
npm run build     # tsc -b && vite build
npm run test      # vitest run
npm run lint      # oxlint
npm run preview   # 빌드 산출물 로컬 미리보기
```

## 배포

`main` 브랜치에 push되면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드 후 GitHub Pages에 자동 배포합니다. 빌드 시 `VITE_GAS_WEB_APP_URL` repo secret이 주입됩니다.

## 구현 범위 밖

실제 PG 결제, 배송 연동, 로그인·회원가입, 원산지·품질인증 판정, 실시간 시세(KAMIS 등) 연동은 이번 MVP 범위에 포함하지 않습니다.

## 프로젝트 배경

전체 요구사항과 근거 자료 상태(어떤 수치가 검증됐고 어떤 것이 미검증 가설인지)는 로컬의 `CLAUDE.md` 핸드오프 문서에 정리되어 있습니다. 백로그는 [GitHub Issues](https://github.com/withgoru/fantastic-engine/issues)로 관리합니다.
