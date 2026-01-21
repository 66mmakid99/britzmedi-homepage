# BRITZMEDI - Claude Code 빠른 시작 가이드

## 🚀 프로젝트 가져오기

```bash
# 프로젝트 디렉토리 생성 및 이동
mkdir britzmedi-website && cd britzmedi-website

# 또는 기존 레포지토리 클론
git clone [your-repo-url] && cd britzmedi-website
```

## 📂 핵심 파일

| 파일 | 설명 | 수정 빈도 |
|------|------|----------|
| `index.html` | 메인 홈페이지 | 낮음 |
| `admin.html` | CMS 관리자 패널 | 중간 |
| `assets/css/styles.css` | 전역 스타일 | 높음 |
| `assets/js/main.js` | 전역 JavaScript | 높음 |

## 🔧 주요 수정 포인트

### 스타일 수정
```bash
# 전역 스타일
assets/css/styles.css

# 컬러 변수 (라인 1-20)
# 다크/라이트 모드 (파일 끝부분)
# 반응형 (1100라인 이후)
```

### JavaScript 수정
```bash
# 전역 JS
assets/js/main.js

# Google Sheets URL 로딩: getGoogleSheetsUrl()
# 폼 제출 로직: initContactForm()
# 이미지 동적 로딩: loadDynamicImages()
# 테마 로딩: loadThemeMode()
```

### Admin 패널 수정
```bash
admin.html

# CMS 데이터 구조: data 객체 (라인 1050 근처)
# 저장 로직: saveAllData()
# 불러오기 로직: populate()
```

## 🎯 자주 하는 작업

### 1. 새 페이지 추가

```html
<!-- 템플릿 구조 -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>페이지명 | BRITZMEDI</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
    <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
<script>if(localStorage.getItem("britzmedi_theme_mode")==="light")document.body.classList.add("light-mode");</script>

    <!-- 헤더 복사 -->
    <!-- 콘텐츠 -->
    <!-- 푸터 복사 -->

    <script src="/assets/js/main.js"></script>
</body>
</html>
```

### 2. 새 CMS 필드 추가

```javascript
// admin.html의 data 객체에 추가
data: {
    home: { ... },
    newPage: {
        title: '기본값',
        description: ''
    }
}

// HTML에 입력 필드 추가
<input type="text" class="form-control" id="newpage-title">

// populate()에 로딩 추가
val('newpage-title', data.newPage.title);

// collect()에 저장 추가
data.newPage.title = val('newpage-title');
```

### 3. 라이트 모드 스타일 추가

```css
/* styles.css 끝부분에 추가 */
body.light-mode .new-element {
    background: #ffffff;
    color: #1a1a1a;
    border-color: #e0e0e0;
}
```

## ⚠️ 주의사항

1. **템플릿 리터럴 사용 금지** (admin.html 내부)
   - 백틱(`) 대신 문자열 연결(+) 사용
   
2. **테마 스크립트 필수**
   - 새 HTML 파일 생성 시 `<body>` 직후에 테마 스크립트 추가

3. **이미지 키 규칙**
   - `data-image-key` 속성으로 CMS 연동
   - 키: hero, torr, ulblanc, newchae, lab 등

4. **폼 ID 규칙**
   - inquiryForm, partnershipForm, contactForm
   - main.js의 initContactForm()에서 자동 처리

## 🧪 로컬 테스트

```bash
# Python 간이 서버
python -m http.server 8000

# Node.js (npx)
npx serve .

# 브라우저에서 확인
open http://localhost:8000
```

## 📦 배포

```bash
# Netlify CLI
netlify deploy --prod

# Vercel CLI
vercel --prod

# GitHub Pages
git push origin main
```

---

**Claude Code에서 이 프로젝트 작업 시:**
```
이 프로젝트는 BRITZMEDI 기업 웹사이트입니다.
BRITZMEDI-PROJECT-SPEC.md 파일을 먼저 읽어주세요.
```
