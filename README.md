# Onet Connect

웹 기반 게임 플랫폼입니다. Google 로그인, 다국어 지원, 랭킹 시스템을 갖춘 SPA이며 Firebase Hosting으로 배포됩니다.
https://vidkidz.tistory.com/306 <- 해당 게임 점수 기록이 안되어서 따로 만들었습니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| **프론트엔드** | React 19.2.0, TypeScript, Vite 7.2.4 |
| **UI** | Material-UI (MUI) ^7.3.7 |
| **라우팅** | React Router 7.12.0 |
| **상태/데이터** | TanStack React Query ^5.90.17 |
| **백엔드** | Firebase 12.7.0 (Auth, Firestore) |
| **다국어** | i18next, react-i18next, i18next-browser-languagedetector |
| **기타** | notistack(알림), react-ga4(Google Analytics 4) |
| **린트** | ESLint 9, TypeScript ESLint |

## 주요 기능

- **게임** — 타일 매칭 게임 플레이
- **랭킹** — 점수 기반 통합 랭킹
- **Google 로그인** — Firebase Authentication
- **계정 관리** — 프로필, 점수 동기화, 계정 삭제
- **다국어** — 11개 언어 (한국어, 영어, 일본어, 중국어 등)
- **개인정보처리방침** — 전용 페이지 및 계정 화면 링크

## 프로젝트 구조

```
onet-connect/
├── .github/
│   └── workflows/           # Firebase Hosting CI (merge, pull-request)
├── public/
│   ├── games/onet/           # Onet 게임 리소스
│   │   ├── images/           # 타일 이미지 (tile1.png ~ tile38.png)
│   │   ├── sounds/           # clear, click, match 사운드
│   │   └── index.html        # 게임 HTML
│   ├── logo.svg
│   └── og-image.png
├── src/
│   ├── configs/              # 앱 설정
│   │   ├── appUrl.ts
│   │   ├── firebaseConfig.ts
│   │   └── router.tsx        # React Router (lazy 라우트)
│   ├── constants/
│   │   └── countries.json    # 국가 목록
│   ├── hooks/                # 인증·랭킹·프로필·점수 훅
│   │   ├── useLoginWithGoogle.ts, useLogout.ts, useDeleteUserAccount.ts
│   │   ├── useGetRanking.ts, useGetMyRanking.ts, useSaveScore.ts
│   │   └── useGetUserProfile.ts, useSyncUserProfile.ts, useUpdateUserProfile.ts
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── components/       # Appbar, LoginButton, UserMenu, LanguageSwitcher 등
│   │   └── styles/           # MUI 스타일 컴포넌트
│   ├── locales/              # i18n 번역 (ko, en, ja, zh-CN, zh-TW, de, es, fr, it, pt, ru)
│   ├── models/               # country, language, ranking, user 타입
│   ├── pages/
│   │   ├── HomePage/
│   │   ├── GamePage/         # OnetWebView 포함
│   │   ├── RankingPage/      # RankingTable 포함
│   │   ├── AccountPage/
│   │   ├── PrivacyPolicyPage/
│   │   ├── NotFoundPage/
│   │   └── ErrorPage/
│   ├── services/             # authService, gameService, rankingService
│   ├── utils/                # analytics, firebase, firebaseErrorLogger, languageDetection 등
│   ├── i18n.ts
│   ├── theme.ts
│   ├── App.tsx
│   └── main.tsx
├── firebase.json             # Firestore 규칙/인덱스, Hosting(SPA rewrites)
├── firestore.rules
├── firestore.indexes.json
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 라우팅

- `/:lng` — 언어 코드 기반 (예: `/ko`, `/en`)
- `/:lng` — 홈
- `/:lng/game` — Onet 게임
- `/:lng/ranking` — 랭킹
- `/:lng/account` — 계정
- `/:lng/privacy` — 개인정보처리방침
- `/` — 브라우저 언어로 리다이렉트

## 스크립트

```bash
npm run dev      # 개발 서버 (Vite)
npm run build    # TypeScript 빌드 후 Vite 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint
```

## 배포

- **Firebase Hosting**: `dist` 디렉터리 배포, SPA용 rewrite 설정
- **CI**: `.github/workflows`에서 merge/PR 시 Firebase 배포 워크플로 실행

## 환경 변수

Firebase 및 앱 URL 등은 `.env`에서 관리합니다. (프로젝트 루트에 `.env.example` 등이 있다면 참고)
