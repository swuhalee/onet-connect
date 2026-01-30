# SEO 메타 및 OG(오픈그래프) 미노출 원인 분석

## 1. 현재 SEO 메타 코드 위치

| 위치 | 내용 |
|------|------|
| **index.html** | `<title>Onet Connect</title>`, viewport, charset 만 존재. **og: / description 없음** |
| **HomePage.tsx** | `<title>`, `meta description`, `og:title`, `og:description`, `og:image`, `twitter:*` |
| **GamePage.tsx** | 동일 구조 |
| **RankingPage.tsx** | 동일 구조 |
| **AccountPage.tsx** | 동일 구조 |
| **NotFoundPage.tsx** | 동일 구조 |

메타 문구는 `src/locales/*.json` 의 `meta.home`, `meta.game` 등에서 관리 중.

---

## 2. 링크 공유 시 og-image / description 이 안 보이는 **원인**

### 원인 1: 크롤러가 받는 HTML에 OG 메타가 없음 (가장 중요)

- Facebook, Twitter, Slack, Discord, 카카오톡 등은 링크를 **미리보기**할 때 **서버가 주는 HTML만** 가져옵니다.
- **JavaScript를 실행하지 않습니다.**
- 따라서:
  - 요청 시 받는 파일 = `index.html` (Firebase Hosting은 `**` → `/index.html` 로 모두 리다이렉트)
  - `index.html` 안에는 **og:title, og:description, og:image** 등이 **전혀 없음**
- 그래서 외부에서 링크 공유 시 **og-image / description 이 안 보이는 것**이 맞습니다.

### 원인 2: OG 메타가 React 컴포넌트 안에서만 렌더링됨

- 각 페이지 컴포넌트에서 `<title>`, `<meta ... />` 를 JSX로 넣고 있음.
- React는 이걸 **`<div id="root">` 안(바디 안)** 에 그립니다. **`<head>` 안에 넣는 게 아님.**
- `react-helmet` / `react-helmet-async` 같은 라이브러리도 사용하지 않고 있어, **문서의 `<head>`에는 여전히 아무 OG 메타도 없음.**
- 즉, JS를 실행하는 환경에서도 **표준적으로 메타가 노출되는 위치(`<head>`)** 가 아님.

### 원인 3: og:image 가 상대 경로로 되어 있음

- 현재: `content="/og-image.png"`
- Open Graph 스펙에서는 **og:image 는 절대 URL** 을 쓰는 것이 맞습니다.
- 상대 경로는 플랫폼에 따라 해석이 달라지거나, 미리보기에서 이미지가 안 나올 수 있습니다.

### 원인 4: SPA 라우팅

- 모든 경로가 같은 `index.html` 로 서빙되므로, **URL별로 서버에서 다른 메타를 넣어 줄 수 없음.**
- 경로별 메타를 주려면 SSR 이나, 빌드 시/서버에서 메타를 주입하는 방식이 필요합니다.

---

## 3. 요약

| 원인 | 설명 |
|------|------|
| **1** | **index.html 에 og/description 메타가 없음** → 크롤러가 받는 HTML에 메타가 없어서 미리보기 불가 |
| **2** | OG 메타가 **React 컴포넌트(바디 안)** 에만 있어서, `<head>` 기준으로 보는 크롤러/도구에는 노출 안 됨 |
| **3** | **og:image** 가 `/og-image.png` 로 **상대 경로** → 절대 URL로 바꾸는 것이 안전 |
| **4** | SPA라 **URL별 메타** 는 서버만으로는 불가 (SSR 등 별도 설계 필요) |

---

## 4. 권장 조치

1. **즉시 적용 (필수)**  
   - **index.html 의 `<head>` 에**  
     - `og:title`, `og:description`, `og:type`, `og:image` (절대 URL),  
     - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`  
     를 **기본값**으로 넣기.  
   - 이렇게 하면 **어떤 URL을 공유해도** 최소한 이 기본 메타는 크롤러가 읽어서 **og-image / description 이 보이기 시작**합니다.

2. **og:image 절대 URL**  
   - 예: `https://<프로젝트>.web.app/og-image.png`  
   - 환경변수 `VITE_APP_URL` 또는 `VITE_SITE_URL` 로 베이스 URL 관리하면 배포 환경별로 바꾸기 쉽습니다.

3. **(선택)**  
   - `react-helmet-async` 로 각 페이지에서 **`<head>` 안에** title/description/og 메타를 넣어 주면,  
     JS를 실행하는 크롤러나 북마크/탭 제목에는 페이지별 메타가 적용됩니다.  
   - 다만 **링크 미리보기는 여전히 index.html 기본 메타에 의존**하므로, 1번이 반드시 선행되어야 합니다.

이대로 적용하면 “링크 공유 시 og-image / description 이 안 보이던” 현상은 **index.html 에 기본 OG 메타 + 절대 URL og:image** 만 넣어도 해소됩니다.
