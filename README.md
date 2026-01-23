# BRITZMEDI 홈페이지

브릿츠메디 기업 웹사이트 - Astro + Decap CMS 기반

## 🚀 프로젝트 구조

```text
/
├── public/
│   └── admin/           # Decap CMS
├── src/
│   ├── components/      # Header, Footer 등
│   ├── content/         # Content Collections
│   │   ├── products/    # 제품 마크다운
│   │   ├── news/        # 뉴스 마크다운
│   │   └── pages/       # JSON 설정
│   ├── layouts/         # BaseLayout
│   ├── pages/           # 라우팅 페이지
│   └── styles/          # 전역 CSS
└── package.json
```

## 🧞 명령어

| 명령어 | 설명 |
| :-- | :-- |
| `npm install` | 의존성 설치 |
| `npm run dev` | 로컬 서버 시작 (localhost:4321) |
| `npm run build` | 프로덕션 빌드 (./dist/) |
| `npm run preview` | 빌드 미리보기 |

## 📝 Decap CMS 설정

### GitHub OAuth 설정 (필수)

Decap CMS를 사용하려면 GitHub OAuth App이 필요합니다.

1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. 설정:
   - Application name: `BRITZMEDI CMS`
   - Homepage URL: `https://britzmedi-homepage.pages.dev`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. Client ID와 Client Secret 저장
4. Netlify에서 Identity + Git Gateway 활성화 또는 외부 OAuth 서버 사용

### 로컬 CMS 사용 (개발용)

OAuth 없이 로컬에서 CMS 사용:

```bash
npx decap-server
```

`public/admin/config.yml`에서 `local_backend: true` 활성화 필요

## ☁️ Cloudflare R2 연동 가이드

### 1. R2 버킷 생성

1. Cloudflare Dashboard → R2 → Create bucket
2. 버킷 이름: `britzmedi-assets`
3. 위치: Auto (또는 원하는 리전)

### 2. 퍼블릭 액세스 설정

1. R2 버킷 → Settings → Public access
2. "Allow public access" 활성화
3. Custom domain 연결 (선택사항): `assets.britzmedi.com`

### 3. CORS 설정

R2 버킷 → Settings → CORS policy:

```json
[
  {
    "AllowedOrigins": ["https://britzmedi-homepage.pages.dev", "http://localhost:4321"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### 4. API 토큰 생성

1. Cloudflare Dashboard → My Profile → API Tokens
2. Create Token → Custom token:
   - Permissions: `R2:Edit`
   - Account Resources: 해당 계정 선택
3. 토큰 저장

### 5. Decap CMS에 R2 연동

`public/admin/config.yml` 수정:

```yaml
# 기존 media_folder/public_folder 주석 처리하고 아래 추가
media_library:
  name: cloudinary  # 또는 custom 어댑터 필요
  config:
    cloud_name: your_cloud_name
```

**참고**: Decap CMS는 기본적으로 R2를 직접 지원하지 않습니다. 대안:
- **Cloudinary** 사용 (무료 티어 제공)
- **커스텀 미디어 라이브러리** 어댑터 개발
- **Git LFS** 사용 (GitHub에 이미지 저장)

### 6. 권장: Cloudinary 사용

1. [cloudinary.com](https://cloudinary.com) 가입 (무료)
2. Cloud name, API Key, API Secret 확인
3. `public/admin/config.yml`:

```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: your_cloud_name
    api_key: your_api_key
```

## 🔧 Cloudflare Pages 설정

### 빌드 설정

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `18` 이상

### 환경 변수 (필요시)

```
NODE_VERSION=18
```

## 📧 EmailJS 설정

문의 폼에 EmailJS가 연동되어 있습니다.

- Service ID: `service_8527rq8`
- Template ID: `template_e1z7fdh`
- Public Key: `qZJl-FQP1CJJqGvNp`

**보안 주의**: 프로덕션에서는 키를 재생성하세요.

## 📁 콘텐츠 관리

### 제품 추가

`src/content/products/` 에 마크다운 파일 생성:

```markdown
---
title: "제품명"
urlSlug: "product-slug"
category: "medical"  # medical 또는 cosmetic
tagline: "짧은 설명"
description: "상세 설명"
features:
  - "특징 1"
  - "특징 2"
image: "/images/product.jpg"
order: 1
---

추가 콘텐츠 (선택사항)
```

### 뉴스 추가

`src/content/news/` 에 마크다운 파일 생성:

```markdown
---
title: "뉴스 제목"
urlSlug: "news-slug"
date: 2024-01-15
category: "news"  # news 또는 notice
excerpt: "요약"
thumbnail: "/images/news.jpg"
---

본문 내용
```

## 🌐 페이지 구조

| 경로 | 설명 |
| :-- | :-- |
| `/` | 메인 홈페이지 (한국어) |
| `/en/` | 영문 페이지 |
| `/company/*` | 기업소개 (intro, way, tech, cibi, contact) |
| `/products/` | 제품 목록 |
| `/products/[slug]` | 제품 상세 |
| `/community/news/` | 뉴스 목록 |
| `/community/news/[slug]` | 뉴스 상세 |
| `/community/media` | 미디어 (SNS, 영상) |
| `/contact` | 문의하기 |
| `/admin/` | Decap CMS |

## 📄 라이선스

BRITZMEDI 내부 사용
