# BRITZMEDI 개발 히스토리

> 최종 업데이트: 2026년 1월 22일

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | BRITZMEDI 기업 웹사이트 |
| **목적** | 피부미용 의료기기 회사 홍보 및 제품 소개 |
| **개발 시작** | 2025년 1월 |
| **현재 버전** | v1.0 (프로덕션 레벨) |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| 폰트 | Pretendard (CDN) |
| 스타일 | CSS Custom Properties, Flexbox, Grid |
| 데이터 저장 | localStorage (CMS) |
| 폼 연동 | Google Apps Script + Google Sheets |
| 배포 | 정적 호스팅 (Netlify, Vercel, GitHub Pages) |

---

## 개발 완료 내역

### Phase 1: 초기 구축
- [x] 18페이지 멀티페이지 웹사이트 구조 설계
- [x] 다크 테마 기반 프리미엄 디자인 적용
- [x] 반응형 레이아웃 구현 (1200px / 1024px / 768px / 480px)
- [x] 모바일 햄버거 메뉴 구현

### Phase 2: CMS 시스템 개발
- [x] admin.html 관리자 패널 개발
- [x] localStorage 기반 데이터 저장 구조 설계
- [x] 실시간 콘텐츠 수정 기능
- [x] 이미지 URL 관리 기능

### Phase 3: 폰트 시스템 통일
- [x] 모든 페이지 Pretendard 폰트 적용
- [x] CDN 방식으로 통일 (jsdelivr)

### Phase 4: UI/UX 최적화
- [x] 섹션 패딩 축소 (4rem → 3rem)
- [x] 반응형 패딩 전체 조정
- [x] 타이틀 크기 및 간격 조정

### Phase 5: 히어로 이미지 컨트롤
- [x] 가로/세로 위치 슬라이더 추가
- [x] 실시간 미리보기 기능
- [x] object-position으로 이미지 위치 제어

### Phase 6: 제품 이미지 시스템
- [x] 썸네일 비율 1:1 정사각형 변경
- [x] 크기 조절 슬라이더 (50~100%)
- [x] 배경 제거 PNG 이미지 대응

### Phase 7: 다크/라이트 모드
- [x] 전체 사이트 라이트 모드 CSS 추가
- [x] Admin 패널 테마 전환 버튼
- [x] 즉시 실행 스크립트로 깜빡임 방지

### Phase 8: Google Sheets 폼 연동
- [x] Formspree → Google Sheets 전환
- [x] CMS에서 URL 동적 로딩
- [x] 폼 제출 시 성공/실패/경고 메시지
- [x] Apps Script 코드 복사 버튼

### Phase 9: SEO 최적화 (PR #2)
- [x] Open Graph 메타태그 추가
- [x] Twitter Card 메타태그 추가
- [x] JSON-LD 구조화 데이터 (MedicalOrganization)
- [x] sitemap.xml 생성
- [x] robots.txt 생성
- [x] Canonical URL 설정
- [x] hreflang 다국어 태그 (ko/en)
- [x] Lazy loading 이미지 적용

### Phase 10: 폼 연동 개선 (PR #3)
- [x] Google Sheets 연동 안정화
- [x] 폼 URL CMS 동적 로딩 버그 수정

### Phase 11: 영문 페이지 CMS 관리 (2026-01-22)
- [x] admin.html에 영문 페이지(English Home) 메뉴 추가
- [x] 영문 페이지 편집 폼 추가 (Hero, Products, Stats, About, Contact, Footer)
- [x] CMS 데이터 구조에 영문 데이터(en) 추가
- [x] populate/collect 함수에 영문 데이터 처리 로직 추가
- [x] en/index.html에 data-en 속성 추가 및 CMS 데이터 동적 로딩 구현
- [x] 영문 Contact 폼 라벨 및 옵션 CMS 관리 지원

---

## Git 커밋 히스토리

```
aabbcef - Merge pull request #3 (폼 연동 개선)
7223a9b - fix: Google Sheets 폼 연동 개선
851cfc6 - Merge pull request #2
199335b - feat: SEO 최적화 및 성능 개선 전체 업데이트
c613b65 - Merge pull request #1
4883305 - fix: Google Sheets 폼 연동 개선
3ea6394 ~ 7204814 - 초기 파일 업로드 (18개 커밋)
```

---

## 해결된 이슈

| 이슈 | 원인 | 해결 방법 |
|------|------|----------|
| Admin 페이지 작동 안함 | 템플릿 리터럴 이스케이프 오류 | 문자열 연결 방식으로 변경 |
| 라이트모드 홈페이지만 적용 | CSS가 index.html에만 인라인 | styles.css에 전역 추가 |
| Google Sheets 연동 안됨 | URL이 하드코딩된 빈 문자열 | CMS에서 동적 로딩 |
| 페이지 이동 시 테마 깜빡임 | DOMContentLoaded 후 적용 | body 직후 즉시 실행 스크립트 |

---

## 현재 페이지 구성 (18페이지)

```
britzmedi-homepage/
├── index.html                 # 메인 홈페이지 (한국어)
├── admin.html                 # CMS 관리자 패널
├── sitemap.xml               # XML 사이트맵
├── robots.txt                # 검색엔진 크롤링 설정
│
├── company/                   # 기업소개 (6페이지)
│   ├── intro.html            # 회사소개
│   ├── ceo.html              # CEO 인사말
│   ├── way.html              # 브리츠 WAY
│   ├── tech.html             # 기술력/연구소
│   ├── cibi.html             # CI/BI
│   └── contact.html          # 오시는 길
│
├── medical/                   # 의료기기 (2페이지)
│   ├── torr.html             # TORR RF
│   └── ulblanc.html          # UL BLANC
│
├── cosmetic/                  # 화장품 (1페이지)
│   └── newchae.html          # NEWCHAE
│
├── community/                 # 커뮤니티 (3페이지)
│   ├── news.html             # 뉴스/공지사항
│   ├── promotion.html        # 홍보영상
│   └── sns.html              # SNS
│
├── cs/                        # 고객지원 (2페이지)
│   ├── inquery.html          # 상담신청
│   └── partnership.html      # 제휴문의
│
└── en/                        # 영문 (1페이지)
    └── index.html            # 영문 원페이지
```

---

## 주요 기능 요약

1. **CMS 관리자 패널** - 코딩 없이 콘텐츠 수정 가능
2. **다크/라이트 모드** - 테마 전환 지원
3. **Google Sheets 폼** - 백엔드 없이 폼 데이터 수집
4. **SEO 최적화** - 검색엔진 노출 최적화
5. **반응형 디자인** - 모든 디바이스 지원
6. **이미지 컨트롤** - 위치/크기 슬라이더로 조절

---

## 코드 통계

| 파일 | 라인 수 |
|------|---------|
| styles.css | ~1,456줄 |
| main.js | ~860줄 |
| admin.html | ~1,200줄 |
| **총계** | **~3,500줄** |

---

*이 문서는 프로젝트 개발 히스토리를 기록하기 위해 작성되었습니다.*
