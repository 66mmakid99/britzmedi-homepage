# BRITZMEDI 향후 개발 계획 (TODO)

> 최종 업데이트: 2026년 1월 22일

---

## 우선순위 높음 (Critical)

### 콘텐츠 교체
- [ ] 실제 제품 이미지 교체 (TORR RF, UL BLANC, NEWCHAE)
- [ ] 실제 회사 정보 입력 (주소, 전화번호, 팩스 등)
- [ ] CEO 인사말 실제 내용으로 교체
- [ ] 회사 연혁 실제 데이터 입력
- [ ] 히어로 이미지 고품질 이미지로 교체

### 기능 완성
- [ ] Google Sheets 연동 테스트 및 실 배포
- [ ] 폼 제출 후 이메일 알림 설정 (Apps Script)
- [ ] Admin 패널 접근 보안 (비밀번호 또는 인증)

### 배포
- [ ] 도메인 연결 (britzmedi.co.kr)
- [ ] SSL 인증서 설정 (HTTPS)
- [ ] 실서버 배포 (Netlify/Vercel)

---

## 우선순위 중간 (Important)

### 기능 개선
- [ ] 뉴스/공지사항 페이지네이션 추가
- [ ] 뉴스 상세 페이지 구현
- [ ] 검색 기능 추가
- [ ] 제품 비교 기능
- [ ] 홍보영상 YouTube 플레이리스트 연동

### 성능 최적화
- [ ] 이미지 WebP 포맷 변환
- [ ] CSS/JS 파일 압축 (minify)
- [ ] Critical CSS 분리
- [ ] CDN 적용 (이미지 서버)

### 접근성 (Accessibility)
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션 개선
- [ ] 스크린 리더 호환성 테스트
- [ ] 색상 대비 검증

### 분석/추적
- [ ] Google Analytics 4 연동
- [ ] Google Search Console 등록
- [ ] 네이버 웹마스터 도구 등록
- [ ] Meta Pixel (Facebook) 설치

---

## 우선순위 낮음 (Nice to Have)

### 다국어 지원 확장
- [x] 영문 버전 (en) CMS 관리 기능 완료
- [ ] 중국어 버전 (zh) 추가
- [ ] 일본어 버전 (ja) 추가
- [ ] 언어 선택 UI 개선

### 추가 기능
- [ ] 블로그 기능 (마크다운 기반)
- [ ] 채팅 상담 연동 (카카오톡 채널, 채널톡)
- [ ] 뉴스레터 구독 기능
- [ ] 파트너 병원 지도 표시
- [ ] 제품 카탈로그 PDF 다운로드

### 고급 CMS 기능
- [ ] 이미지 직접 업로드 (현재는 URL만 지원)
- [ ] CMS 데이터 내보내기/가져오기 (JSON)
- [ ] 변경 히스토리 추적
- [ ] 다중 관리자 지원

### 마케팅 기능
- [ ] 팝업 배너 시스템
- [ ] 이벤트/프로모션 페이지 템플릿
- [ ] 랜딩 페이지 빌더

---

## 기술 부채 (Tech Debt)

### 코드 품질
- [ ] JavaScript 모듈화 (ES6 modules)
- [ ] TypeScript 도입 검토
- [ ] CSS 변수 정리 및 문서화
- [ ] 코드 주석 보완

### 테스트
- [ ] 크로스 브라우저 테스트 (Chrome, Safari, Firefox, Edge)
- [ ] 모바일 기기 테스트 (iOS, Android)
- [ ] 폼 제출 E2E 테스트
- [ ] Lighthouse 성능 점수 90+ 달성

### 문서화
- [ ] API 문서 (Google Sheets 연동)
- [ ] 컴포넌트 가이드
- [ ] 배포 자동화 가이드

---

## 버그 및 개선 사항

### 알려진 이슈
- [ ] 모바일에서 드롭다운 메뉴 터치 영역 확대 필요
- [ ] Safari에서 스크롤 애니메이션 간헐적 버그
- [ ] 매우 긴 텍스트 입력 시 레이아웃 깨짐

### UX 개선
- [ ] 로딩 스켈레톤 UI 추가
- [ ] 스크롤 투 탑 버튼
- [ ] 브레드크럼 네비게이션
- [ ] 404 에러 페이지 디자인

---

## 완료된 항목 (Archive)

### 2026년 1월 22일
- [x] 영문 페이지(en/index.html) CMS 관리 기능 추가
  - admin.html에 English Home 메뉴 및 편집 폼 추가
  - Hero, Products, Stats, About, Contact, Footer 섹션 관리 가능
  - Contact 폼 라벨 및 옵션까지 미세 조정 가능

### 2026년 1월
- [x] Google Sheets 폼 연동 개선 (PR #3)
- [x] SEO 최적화 및 성능 개선 (PR #2)
- [x] 초기 웹사이트 구축 완료

---

## 일정 제안

| 단계 | 내용 | 예상 기간 |
|------|------|----------|
| **Phase 1** | 콘텐츠 교체 + 배포 | 1주 |
| **Phase 2** | 분석 도구 연동 + 보안 | 1주 |
| **Phase 3** | 성능 최적화 + 접근성 | 2주 |
| **Phase 4** | 추가 기능 개발 | 필요시 |

---

## 참고 자료

- [DEVELOPMENT-HISTORY.md](./DEVELOPMENT-HISTORY.md) - 개발 히스토리
- [BRITZMEDI-PROJECT-SPEC.md](./BRITZMEDI-PROJECT-SPEC.md) - 프로젝트 명세서
- [CLAUDE-CODE-QUICKSTART.md](./CLAUDE-CODE-QUICKSTART.md) - 개발 가이드

---

*이 문서는 향후 개발 계획을 관리하기 위해 작성되었습니다.*
*작업 완료 시 체크박스를 [x]로 변경하고 완료 날짜를 기록해주세요.*
