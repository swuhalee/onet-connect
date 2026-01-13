# Onet Connect

웹 기반 Onet 게임 플랫폼으로, 게임 플레이와 랭킹 시스템을 제공하는 React 애플리케이션입니다.

## 기술 스택

- React 19.2.0
- TypeScript
- Vite 7.2.4
- Material-UI (MUI) ^7.3.7
- React Router 7.12.0
- ESLint with TypeScript

## 프로젝트 구조

```
onet-connect/
├── public/
│   ├── games/onet/          # Onet 게임 리소스
│   │   ├── images/          # 게임 타일 이미지
│   │   ├── sounds/          # 게임 사운드 파일
│   │   └── index.html       # 게임 HTML
│   └── logo.svg             # 로고 이미지
├── src/
│   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── AppLayout.tsx    # 메인 레이아웃
│   │   └── components/
│   │       ├── Appbar/      # 상단 네비게이션 바
│   │       └── AuthButtons/ # 인증 버튼
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── HomePage/        # 홈 페이지 (게임)
│   │   └── RankingPage/     # 랭킹 페이지
│   ├── models/              # 데이터 모델
│   │   └── ranking.ts       # 랭킹 데이터 타입
│   ├── theme.ts             # Material-UI 테마 설정
│   ├── App.tsx              # 메인 앱 컴포넌트
│   └── main.tsx             # 앱 진입점
├── package.json
├── vite.config.ts
└── tsconfig.json
```
