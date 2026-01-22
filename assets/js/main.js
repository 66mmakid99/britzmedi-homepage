/* ============================================
   BRITZMEDI Main JavaScript
   ============================================ */

// Google Sheets URL은 CMS에서 동적으로 가져옴
function getGoogleSheetsUrl() {
    try {
        const cmsData = JSON.parse(localStorage.getItem('britzmedi_cms') || '{}');
        return cmsData.settings?.googleSheetsUrl || '';
    } catch (e) {
        return '';
    }
}

// ============================================
// CMS Data Integration - 어드민 패널 연동
// ============================================
const CMS_STORAGE_KEY = 'britzmedi_cms';

function loadCMSData() {
    try {
        const saved = localStorage.getItem(CMS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (e) {
        console.warn('CMS 데이터 로드 실패:', e);
        return null;
    }
}

function applyCMSData() {
    const cms = loadCMSData();
    if (!cms) return;

    // Helper: 텍스트에서 *강조* 처리
    const formatText = (text) => {
        if (!text) return '';
        return text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    };

    // Helper: 요소에 텍스트 적용
    const setText = (selector, value, useFormat = false) => {
        const el = document.querySelector(selector);
        if (el && value) {
            if (useFormat) {
                el.innerHTML = formatText(value);
            } else {
                el.textContent = value;
            }
        }
    };

    // Helper: 버튼 텍스트만 변경 (SVG 보존)
    const setButtonText = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && value) {
            // SVG 요소 백업
            const svg = el.querySelector('svg');
            // 텍스트만 변경
            el.textContent = value + ' ';
            // SVG 복원
            if (svg) el.appendChild(svg);
        }
    };

    // Helper: 요소에 HTML 적용
    const setHTML = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && value) el.innerHTML = value;
    };

    // ========== 홈페이지 ==========
    if (cms.home) {
        // Hero 섹션
        if (cms.home.hero) {
            setText('[data-cms="home-hero-subtitle"]', cms.home.hero.subtitle);
            setText('[data-cms="home-hero-title"]', cms.home.hero.title, true);
            setText('[data-cms="home-hero-description"]', cms.home.hero.description);
            setButtonText('[data-cms="home-hero-cta"]', cms.home.hero.ctaText);
            const ctaLink = document.querySelector('[data-cms="home-hero-cta"]');
            if (ctaLink && cms.home.hero.ctaLink) ctaLink.href = cms.home.hero.ctaLink;
        }

        // 통계 섹션
        if (cms.home.stats && Array.isArray(cms.home.stats)) {
            cms.home.stats.forEach((stat, i) => {
                setText(`[data-cms="home-stat${i+1}-number"]`, stat.number);
                setText(`[data-cms="home-stat${i+1}-label"]`, stat.label);
            });
        }

        // About 섹션
        if (cms.home.about) {
            setText('[data-cms="home-about-label"]', cms.home.about.label);
            setText('[data-cms="home-about-title"]', cms.home.about.title, true);
            setText('[data-cms="home-about-desc1"]', cms.home.about.desc1);
            setText('[data-cms="home-about-desc2"]', cms.home.about.desc2);
            setButtonText('[data-cms="home-about-btn"]', cms.home.about.btnText);
            const aboutBtn = document.querySelector('[data-cms="home-about-btn"]');
            if (aboutBtn && cms.home.about.btnLink) aboutBtn.href = cms.home.about.btnLink;
        }

        // 제품 섹션
        if (cms.home.products) {
            setText('[data-cms="home-products-label"]', cms.home.products.label);
            setText('[data-cms="home-products-title"]', cms.home.products.title, true);
            if (cms.home.products.items) {
                cms.home.products.items.forEach((item, i) => {
                    setText(`[data-cms="home-product${i+1}-label"]`, item.label);
                    setText(`[data-cms="home-product${i+1}-name"]`, item.name);
                    setText(`[data-cms="home-product${i+1}-desc"]`, item.desc);
                });
            }
        }
    }

    // ========== 회사소개 ==========
    if (cms.company) {
        if (cms.company.intro) {
            setText('[data-cms="intro-hero-label"]', cms.company.intro.heroLabel);
            setText('[data-cms="intro-hero-title"]', cms.company.intro.heroTitle, true);
            setText('[data-cms="intro-content-label"]', cms.company.intro.contentLabel);
            setText('[data-cms="intro-content-title"]', cms.company.intro.contentTitle, true);
            setText('[data-cms="intro-content-desc1"]', cms.company.intro.contentDesc1);
            setText('[data-cms="intro-content-desc2"]', cms.company.intro.contentDesc2);
        }

        // 핵심 가치
        if (cms.company.values && Array.isArray(cms.company.values)) {
            cms.company.values.forEach((val, i) => {
                setText(`[data-cms="value${i+1}-title"]`, val.title);
                setText(`[data-cms="value${i+1}-desc"]`, val.desc);
            });
        }

        // 연혁
        if (cms.company.history && Array.isArray(cms.company.history)) {
            const historyContainer = document.querySelector('[data-cms="history-container"]');
            if (historyContainer) {
                historyContainer.innerHTML = cms.company.history.map(h => `
                    <div class="timeline-item reveal">
                        <div class="timeline-year">${h.year}</div>
                        <div class="timeline-content">
                            <h4>${h.title}</h4>
                            <p>${h.desc}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // CEO
        if (cms.company.ceo) {
            setText('[data-cms="ceo-name"]', cms.company.ceo.name);
            setText('[data-cms="ceo-position"]', cms.company.ceo.position);
            setText('[data-cms="ceo-quote"]', cms.company.ceo.quote, true);
            const ceoMessage = document.querySelector('[data-cms="ceo-message"]');
            if (ceoMessage && cms.company.ceo.message) {
                ceoMessage.innerHTML = cms.company.ceo.message.split('\n\n').map(p => `<p>${p}</p>`).join('');
            }
            const ceoImg = document.querySelector('[data-cms="ceo-image"]');
            if (ceoImg && cms.company.ceo.image) ceoImg.src = cms.company.ceo.image;
        }

        // 연락처
        if (cms.company.contact) {
            setText('[data-cms="contact-address"]', cms.company.contact.address);
            setText('[data-cms="contact-tel"]', cms.company.contact.tel);
            setText('[data-cms="contact-fax"]', cms.company.contact.fax);
            setText('[data-cms="contact-hours"]', cms.company.contact.hours);
            setText('[data-cms="contact-closed"]', cms.company.contact.closed);
            const mapFrame = document.querySelector('[data-cms="contact-map"]');
            if (mapFrame && cms.company.contact.map) mapFrame.src = cms.company.contact.map;
        }
    }

    // ========== 제품 - TORR ==========
    if (cms.products && cms.products.torr) {
        const torr = cms.products.torr;
        setText('[data-cms="torr-name"]', torr.name);
        setText('[data-cms="torr-tagline"]', torr.tagline);
        setText('[data-cms="torr-description"]', torr.description);
        const torrImg = document.querySelector('[data-cms="torr-image"]');
        if (torrImg && torr.image) torrImg.src = torr.image;

        if (torr.features) {
            torr.features.forEach((f, i) => {
                setText(`[data-cms="torr-f${i+1}-title"]`, f.title);
                setText(`[data-cms="torr-f${i+1}-desc"]`, f.desc);
            });
        }

        if (torr.benefits) {
            const benefitsList = document.querySelector('[data-cms="torr-benefits"]');
            if (benefitsList) {
                benefitsList.innerHTML = torr.benefits.split('\n').filter(b => b.trim()).map(b => `<li>${b}</li>`).join('');
            }
        }

        if (torr.specs) {
            const specsTable = document.querySelector('[data-cms="torr-specs"]');
            if (specsTable) {
                specsTable.innerHTML = torr.specs.map(s => `<tr><th>${s.label}</th><td>${s.value}</td></tr>`).join('');
            }
        }
    }

    // ========== 제품 - UL BLANC ==========
    if (cms.products && cms.products.ulblanc) {
        const ulblanc = cms.products.ulblanc;
        setText('[data-cms="ulblanc-name"]', ulblanc.name);
        setText('[data-cms="ulblanc-tagline"]', ulblanc.tagline);
        setText('[data-cms="ulblanc-description"]', ulblanc.description);
        const ulblancImg = document.querySelector('[data-cms="ulblanc-image"]');
        if (ulblancImg && ulblanc.image) ulblancImg.src = ulblanc.image;

        if (ulblanc.features) {
            ulblanc.features.forEach((f, i) => {
                setText(`[data-cms="ulblanc-f${i+1}-title"]`, f.title);
                setText(`[data-cms="ulblanc-f${i+1}-desc"]`, f.desc);
            });
        }

        if (ulblanc.benefits) {
            const benefitsList = document.querySelector('[data-cms="ulblanc-benefits"]');
            if (benefitsList) {
                benefitsList.innerHTML = ulblanc.benefits.split('\n').filter(b => b.trim()).map(b => `<li>${b}</li>`).join('');
            }
        }

        if (ulblanc.specs) {
            const specsTable = document.querySelector('[data-cms="ulblanc-specs"]');
            if (specsTable) {
                specsTable.innerHTML = ulblanc.specs.map(s => `<tr><th>${s.label}</th><td>${s.value}</td></tr>`).join('');
            }
        }
    }

    // ========== 제품 - NEWCHAE ==========
    if (cms.products && cms.products.newchae) {
        const newchae = cms.products.newchae;
        setText('[data-cms="newchae-name"]', newchae.name);
        setText('[data-cms="newchae-tagline"]', newchae.tagline);
        setText('[data-cms="newchae-description"]', newchae.description);
        const newchaeImg = document.querySelector('[data-cms="newchae-image"]');
        if (newchaeImg && newchae.image) newchaeImg.src = newchae.image;

        if (newchae.features) {
            newchae.features.forEach((f, i) => {
                setText(`[data-cms="newchae-f${i+1}-title"]`, f.title);
                setText(`[data-cms="newchae-f${i+1}-desc"]`, f.desc);
            });
        }
    }

    // ========== 뉴스 ==========
    if (cms.news && Array.isArray(cms.news)) {
        const newsContainer = document.querySelector('[data-cms="news-list"]');
        if (newsContainer && cms.news.length > 0) {
            newsContainer.innerHTML = cms.news.slice(0, 6).map(n => `
                <article class="news-card reveal">
                    <div class="news-card-content">
                        <time>${n.date}</time>
                        <h3>${n.title}</h3>
                    </div>
                </article>
            `).join('');
        }
    }

    // ========== Footer ==========
    if (cms.settings && cms.settings.footer) {
        const footer = cms.settings.footer;
        setText('[data-cms="footer-description"]', footer.description);
        setText('[data-cms="footer-ceo"]', footer.ceo);
        setText('[data-cms="footer-biznum"]', footer.biznum);
        
        const kakaoLink = document.querySelector('[data-cms="footer-kakao"]');
        if (kakaoLink && footer.kakao) kakaoLink.href = footer.kakao;
        const instaLink = document.querySelector('[data-cms="footer-instagram"]');
        if (instaLink && footer.instagram) instaLink.href = footer.instagram;
        const ytLink = document.querySelector('[data-cms="footer-youtube"]');
        if (ytLink && footer.youtube) ytLink.href = footer.youtube;
    }

    console.log('CMS 데이터 적용 완료');
}

// 페이지 로드 시 CMS 데이터 적용
document.addEventListener('DOMContentLoaded', applyCMSData);

// ============================================
// Loading Screen
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1000);
});

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');

function toggleMobileMenu() {
    if (mobileMenu && mobileOverlay) {
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
}

if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);
if (mobileClose) mobileClose.addEventListener('click', toggleMobileMenu);

// Mobile Dropdown Toggle
if (mobileMenu) {
    const mobileNavItems = mobileMenu.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        const link = item.querySelector('.mobile-nav-link');
        const dropdown = item.querySelector('.mobile-dropdown');
        
        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // 다른 열린 메뉴 닫기
                mobileNavItems.forEach(other => {
                    if (other !== item && other.classList.contains('open')) {
                        other.classList.remove('open');
                    }
                });
                // 현재 메뉴 토글
                item.classList.toggle('open');
            });
        }
    });
    
    // Close mobile menu on sub-link click
    mobileMenu.querySelectorAll('.mobile-dropdown a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

document.addEventListener('DOMContentLoaded', initReveal);

// ============================================
// Form Submission to Google Sheets
// ============================================
function initContactForm() {
    const forms = document.querySelectorAll('.contact-form, #contactForm, #inquiryForm, #partnershipForm');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> 전송 중...';
            submitBtn.disabled = true;
            
            // 로딩 스피너 스타일 추가
            addFormStyles();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.timestamp = new Date().toLocaleString('ko-KR');
            data.page = window.location.pathname;
            
            // 폼 타입 결정
            if (form.id === 'inquiryForm') {
                data.formType = '상담신청';
            } else if (form.id === 'partnershipForm') {
                data.formType = '제휴문의';
            } else {
                data.formType = '홈페이지문의';
            }

            // Google Sheets URL 동적으로 가져오기
            const googleSheetsUrl = getGoogleSheetsUrl();

            if (googleSheetsUrl && googleSheetsUrl.length > 10) {
                try {
                    // Google Apps Script로 폼 데이터 전송
                    // no-cors 모드에서는 JSON body가 제대로 전달되지 않으므로
                    // URL 파라미터 방식 또는 FormData 사용
                    const response = await fetch(googleSheetsUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'text/plain',
                        },
                        body: JSON.stringify(data)
                    });

                    // no-cors 모드에서는 response를 읽을 수 없지만,
                    // 에러가 발생하지 않으면 전송은 완료된 것으로 간주
                    showFormMessage(form, 'success', '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
                    form.reset();

                    console.log('📤 폼 데이터 전송 완료:', data);
                } catch (error) {
                    console.error('Form submission error:', error);
                    showFormMessage(form, 'error', '전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
                }
            } else {
                // Google Sheets URL이 설정되지 않은 경우
                console.log('📋 폼 데이터 (Google Sheets URL 미설정):', data);
                showFormMessage(form, 'warning', 'Google Sheets URL이 설정되지 않았습니다. Admin 패널 > 설정 > 폼/Footer에서 설정해주세요.');
            }

            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        });
    });
}

// 폼 메시지 표시
function showFormMessage(form, type, message) {
    // 기존 메시지 제거
    const existingMsg = form.parentElement.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    // 새 메시지 생성
    const msgDiv = document.createElement('div');
    msgDiv.className = `form-message form-message-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';
    msgDiv.innerHTML = `
        <span class="form-message-icon">${icon}</span>
        <span>${message}</span>
    `;
    
    form.parentElement.appendChild(msgDiv);
    
    // 성공 시 5초 후 메시지 자동 제거
    if (type === 'success') {
        setTimeout(() => {
            msgDiv.style.animation = 'formSlideIn 0.3s ease reverse';
            setTimeout(() => msgDiv.remove(), 300);
        }, 5000);
    }
}

// 폼 관련 스타일 추가
function addFormStyles() {
    if (document.querySelector('#form-message-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'form-message-styles';
    style.textContent = `
        .form-message {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 1.25rem;
            border-radius: 8px;
            margin-top: 1rem;
            font-size: 0.9rem;
            animation: formSlideIn 0.3s ease;
        }
        @keyframes formSlideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .form-message-success {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #22c55e;
        }
        .form-message-error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
        }
        .form-message-warning {
            background: rgba(201, 169, 98, 0.1);
            border: 1px solid rgba(201, 169, 98, 0.3);
            color: #c9a962;
        }
        .form-message-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        }
        .form-message-success .form-message-icon { background: rgba(34, 197, 94, 0.2); }
        .form-message-error .form-message-icon { background: rgba(239, 68, 68, 0.2); }
        .form-message-warning .form-message-icon { background: rgba(201, 169, 98, 0.2); }
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: formSpin 0.8s linear infinite;
            margin-right: 8px;
        }
        @keyframes formSpin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', initContactForm);

// ============================================
// Toast Notification
// ============================================
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            ${type === 'success' 
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
            }
        </div>
        <span class="toast-message">${message}</span>
    `;

    // Add styles if not already present
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast-notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                padding: 1rem 1.5rem;
                background: #1e1e1e;
                border: 1px solid #404040;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 10000;
            }
            .toast-notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            .toast-notification.success {
                border-color: #22c55e;
            }
            .toast-notification.success .toast-icon {
                color: #22c55e;
            }
            .toast-notification.error {
                border-color: #ef4444;
            }
            .toast-notification.error .toast-icon {
                color: #ef4444;
            }
            .toast-icon svg {
                width: 20px;
                height: 20px;
            }
            .toast-message {
                font-size: 0.9rem;
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);

    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// Image Loading from localStorage (for admin)
// ============================================
const defaultImages = {
    hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80',
    product1: 'https://images.unsplash.com/photo-1559757175-7cb04bc9c7f5?w=800&q=80',
    product2: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    product3: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    about: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e117?w=800&q=80',
    gallery1: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
    gallery2: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    gallery3: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80',
    gallery4: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80',
    gallery5: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
    torr: 'https://images.unsplash.com/photo-1559757175-7cb04bc9c7f5?w=800&q=80',
    ulblanc: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    newchae: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    company: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    lab: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80'
};

function loadDynamicImages() {
    const savedImages = JSON.parse(localStorage.getItem('britzmedi_images') || '{}');
    const savedPositions = JSON.parse(localStorage.getItem('britzmedi_image_positions') || '{}');
    
    document.querySelectorAll('[data-image-key]').forEach(el => {
        const key = el.dataset.imageKey;
        const imageUrl = savedImages[key] || defaultImages[key];
        if (imageUrl) {
            if (el.tagName === 'IMG') {
                el.src = imageUrl;
                // 히어로 이미지 위치 적용
                if (key === 'hero' && savedPositions.hero) {
                    el.style.objectPosition = savedPositions.hero;
                }
            } else {
                el.style.backgroundImage = `url(${imageUrl})`;
            }
        }
    });
    
    // 제품 이미지 스케일 적용
    const savedScales = JSON.parse(localStorage.getItem('britzmedi_image_scales') || '{}');
    ['torr', 'ulblanc', 'newchae'].forEach(key => {
        const img = document.querySelector(`[data-image-key="${key}"]`);
        if (img && savedScales[key]) {
            img.style.maxWidth = savedScales[key] + '%';
            img.style.maxHeight = savedScales[key] + '%';
        }
    });
}

document.addEventListener('DOMContentLoaded', loadDynamicImages);

// ============================================
// Light/Dark Mode Toggle
// ============================================
function loadThemeMode() {
    const savedMode = localStorage.getItem('britzmedi_theme_mode');
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
    }
}
document.addEventListener('DOMContentLoaded', loadThemeMode);

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// Language Detection (for homepage)
// ============================================
function checkLanguageRedirect() {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        if (!localStorage.getItem('britzmedi_lang_selected')) {
            const userLang = navigator.language || navigator.userLanguage;
            if (!userLang.startsWith('ko')) {
                window.location.href = '/en/';
            }
        }
    }
}

// Uncomment to enable auto language detection
// checkLanguageRedirect();

// ============================================
// Video Modal (for promotion page)
// ============================================
function initVideoModal() {
    const videoButtons = document.querySelectorAll('[data-video]');
    
    videoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoUrl = btn.dataset.video;
            openVideoModal(videoUrl);
        });
    });
}

function openVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-overlay"></div>
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
        </div>
    `;

    // Add styles
    if (!document.querySelector('#video-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'video-modal-styles';
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .video-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
            }
            .video-modal-content {
                position: relative;
                width: 90%;
                max-width: 900px;
                aspect-ratio: 16/9;
            }
            .video-modal-content iframe {
                width: 100%;
                height: 100%;
            }
            .video-modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: #fff;
                font-size: 2rem;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close events
    modal.querySelector('.video-modal-overlay').addEventListener('click', () => closeVideoModal(modal));
    modal.querySelector('.video-modal-close').addEventListener('click', () => closeVideoModal(modal));
}

function closeVideoModal(modal) {
    modal.remove();
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', initVideoModal);

// ============================================
// Lazy Loading for Images
// ============================================
function initLazyLoading() {
    // Add loading="lazy" to all images except hero images (for LCP optimization)
    document.querySelectorAll('img:not(.hero-bg-image):not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

document.addEventListener('DOMContentLoaded', initLazyLoading);
