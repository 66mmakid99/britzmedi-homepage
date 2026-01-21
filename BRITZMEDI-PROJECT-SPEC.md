# BRITZMEDI 웹사이트 프로젝트 명세서

## 📋 프로젝트 개요

**프로젝트명:** BRITZMEDI 기업 웹사이트  
**목적:** 피부미용 의료기기 회사 브리츠메디의 기업 홍보 및 제품 소개 웹사이트  
**개발 기간:** 2025년 1월  
**현재 버전:** 1.0  

---

## 🏗️ 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| 폰트 | Pretendard (CDN) |
| 스타일 | CSS Custom Properties (변수), Flexbox, Grid |
| 데이터 저장 | localStorage (CMS 데이터) |
| 폼 연동 | Google Apps Script + Google Sheets |
| 배포 | 정적 호스팅 (Netlify, Vercel, GitHub Pages 등) |

---

## 📁 파일 구조

```
britzmedi-website/
├── index.html                 # 메인 홈페이지 (한국어)
├── admin.html                 # CMS 관리자 패널
├── assets/
│   ├── css/
│   │   └── styles.css         # 전역 스타일시트
│   └── js/
│       └── main.js            # 전역 JavaScript
├── company/                   # 회사소개
│   ├── intro.html             # 회사 소개
│   ├── ceo.html               # CEO 인사말
│   ├── way.html               # 브리츠 WAY
│   ├── tech.html              # 기술력
│   ├── cibi.html              # CI/BI
│   └── contact.html           # 오시는 길
├── medical/                   # 의료기기
│   ├── torr.html              # TORR RF 제품
│   └── ulblanc.html           # UL BLANC 제품
├── cosmetic/                  # 화장품
│   └── newchae.html           # NEWCHAE 제품
├── community/                 # 커뮤니티
│   ├── news.html              # 뉴스/공지
│   ├── promotion.html         # 프로모션
│   └── sns.html               # SNS
├── cs/                        # 고객지원
│   ├── inquery.html           # 상담신청
│   └── partnership.html       # 제휴문의
└── en/                        # 영문 버전
    └── index.html             # 영문 원페이지
```

---

## 🎨 디자인 시스템

### 컬러 팔레트 (CSS 변수)

```css
:root {
    /* 다크 모드 (기본) */
    --bg-primary: #0a0a0a;
    --bg-secondary: #111111;
    --bg-tertiary: #1a1a1a;
    --white: #ffffff;
    --gold: #c9a962;           /* 브랜드 포인트 컬러 */
    --gray-100 ~ --gray-800;   /* 그레이 스케일 */
}

/* 라이트 모드 */
body.light-mode {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f8f8;
    --white: #1a1a1a;
    /* ... */
}
```

### 폰트

```css
--font-main: 'Pretendard', -apple-system, sans-serif;
```

### 반응형 브레이크포인트

- 1200px: 태블릿 대형
- 1024px: 태블릿
- 768px: 모바일 대형
- 480px: 모바일

---

## ⚙️ 주요 기능

### 1. CMS (관리자 패널)

**경로:** `/admin.html`

**기능:**
- 모든 페이지 텍스트 콘텐츠 수정
- 이미지 URL 관리 (히어로, 제품 썸네일)
- 히어로 이미지 위치 조절 (가로/세로 슬라이더)
- 제품 이미지 크기 조절 (50~100%)
- 다크/라이트 모드 전환
- Google Sheets 연동 URL 설정
- Footer 정보 관리

**데이터 저장 (localStorage 키):**
```javascript
'britzmedi_cms'              // 전체 CMS 데이터
'britzmedi_images'           // 이미지 URL
'britzmedi_image_positions'  // 히어로 이미지 위치 { hero: "50% 30%" }
'britzmedi_image_scales'     // 제품 이미지 스케일 { torr: 85, ulblanc: 85, newchae: 85 }
'britzmedi_theme_mode'       // 테마 모드 'dark' | 'light'
```

### 2. 다크/라이트 모드

**작동 방식:**
- Admin 패널 헤더의 테마 전환 버튼으로 제어
- `localStorage.getItem('britzmedi_theme_mode')` 값에 따라 적용
- 모든 HTML 파일 `<body>` 직후에 즉시 실행 스크립트로 깜빡임 방지

```html
<body>
<script>if(localStorage.getItem("britzmedi_theme_mode")==="light")document.body.classList.add("light-mode");</script>
```

### 3. Google Sheets 폼 연동

**지원 폼:**
- 상담신청 (`#inquiryForm`)
- 제휴문의 (`#partnershipForm`)
- 홈페이지 문의 (`#contactForm`)

**설정 방법:**
1. Google Sheets 생성
2. 확장 프로그램 → Apps Script
3. Admin 패널에서 "Apps Script 코드 복사" 버튼 클릭
4. 코드 붙여넣고 배포 (웹 앱, 모든 사용자 액세스)
5. 생성된 URL을 Admin > 설정 > 폼/Footer에 입력

**Apps Script 코드:**
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['타임스탬프', '폼 유형', '이름', '회사/병원', '연락처', '이메일', '관심제품/유형', '문의내용']);
  }
  
  sheet.appendRow([
    data.timestamp, data.formType, data.name, data.company,
    data.phone, data.email, data.product || data.partnership_type, data.message
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 4. 이미지 동적 로딩

**main.js의 `loadDynamicImages()` 함수:**
- `data-image-key` 속성으로 이미지 식별
- localStorage에서 URL 읽어서 적용
- 히어로 이미지 위치(`object-position`) 적용
- 제품 이미지 스케일(`max-width`, `max-height`) 적용

```html
<img data-image-key="hero" src="default.jpg">
<img data-image-key="torr" src="default.jpg">
```

---

## 📝 개발 히스토리

### Phase 1: 초기 구축
- 19페이지 멀티페이지 웹사이트 구조 설계
- 다크 테마 기반 프리미엄 디자인
- 반응형 레이아웃 구현
- CMS 관리자 패널 개발

### Phase 2: CMS 통합
- localStorage 기반 데이터 저장
- 실시간 콘텐츠 수정 기능
- 이미지 URL 관리 기능

### Phase 3: 폰트 통일
- 모든 페이지 Pretendard 폰트 적용
- CDN 방식으로 통일

### Phase 4: 간격 최적화
- 섹션 패딩 축소 (4rem → 3rem)
- 반응형 패딩 전체 조정
- 타이틀 크기 조정

### Phase 5: 히어로 이미지 컨트롤
- 가로/세로 위치 슬라이더 추가
- 실시간 미리보기
- localStorage 저장

### Phase 6: 제품 이미지 개선
- 썸네일 비율 1:1 정사각형으로 변경
- 크기 조절 슬라이더 (50~100%)
- 배경 제거 PNG 대응

### Phase 7: 다크/라이트 모드
- 전체 사이트 라이트 모드 CSS 추가
- Admin 패널에 테마 전환 버튼
- 즉시 실행 스크립트로 깜빡임 방지

### Phase 8: Google Sheets 폼 연동
- Formspree → Google Sheets 전환
- CMS에서 URL 동적 로딩
- 폼 제출 시 메시지 표시 (성공/실패/경고)
- Apps Script 코드 복사 버튼

---

## 🐛 해결된 이슈

| 이슈 | 원인 | 해결 |
|------|------|------|
| Admin 페이지 작동 안함 | 템플릿 리터럴 이스케이프 오류 (`\``) | 문자열 연결 방식으로 변경 |
| 라이트모드 홈페이지만 적용 | CSS가 index.html에만 인라인 | styles.css에 전역 추가 |
| 폼 Google Sheets 연동 안됨 | URL이 하드코딩된 빈 문자열 | CMS에서 동적 로딩하도록 수정 |
| 페이지 이동 시 테마 깜빡임 | DOMContentLoaded 후 적용 | body 직후 즉시 실행 스크립트 |

---

## 🔧 향후 개선 사항 (TODO)

### 우선순위 높음
- [ ] 실제 제품 이미지 교체
- [ ] 실제 회사 정보 입력
- [ ] Google Sheets 연동 테스트 및 배포
- [ ] SEO 메타태그 최적화

### 우선순위 중간
- [ ] 뉴스/공지사항 동적 로딩 (Google Sheets 연동)
- [ ] 이미지 lazy loading
- [ ] 페이지 로딩 성능 최적화
- [ ] 접근성(a11y) 개선

### 우선순위 낮음
- [ ] 다국어 지원 확장 (중국어, 일본어)
- [ ] 블로그 기능
- [ ] 제품 비교 기능
- [ ] 채팅 상담 연동

---

## 🚀 배포 가이드

### 정적 호스팅 (Netlify/Vercel)

1. 전체 파일을 GitHub 레포지토리에 업로드
2. Netlify/Vercel에서 레포지토리 연결
3. 빌드 명령어 없이 정적 배포
4. 커스텀 도메인 연결 (선택)

### 주의사항

- `admin.html`은 공개 접근 가능하므로 필요시 별도 보호
- localStorage 데이터는 브라우저별로 독립적
- 여러 관리자가 사용할 경우 데이터 동기화 고려 필요

---

## 📞 기술 지원

이 프로젝트는 Claude AI와의 대화를 통해 개발되었습니다.
추가 개발이나 수정이 필요한 경우, 이 명세서와 함께 코드를 제공하면 됩니다.

---

**최종 업데이트:** 2025년 1월 22일
