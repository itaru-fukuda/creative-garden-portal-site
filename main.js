import toolsData from './data.json';
import siteContent from './content.json';

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. サイト基本データの反映 (JSONデータ連携)
  // ==========================================
  if (siteContent.site) {
    const titleEl = document.getElementById('site-title');
    if (titleEl) titleEl.textContent = siteContent.site.title;
    const descEl = document.getElementById('site-desc');
    if (descEl) descEl.content = siteContent.site.description;
    const markEl = document.getElementById('logo-mark');
    if (markEl) markEl.innerHTML = siteContent.site.logoMark;
    const textEl = document.getElementById('logo-text');
    if (textEl) textEl.innerHTML = siteContent.site.logoText;
  }

  // ヒーローセクション
  if (siteContent.hero) {
    const hEyebrow = document.getElementById('hero-eyebrow');
    if (hEyebrow) hEyebrow.innerHTML = siteContent.hero.eyebrow;
    const hHeadline = document.getElementById('hero-headline');
    if (hHeadline) hHeadline.innerHTML = siteContent.hero.headline;
    const hDesc = document.getElementById('hero-desc');
    if (hDesc) hDesc.innerHTML = siteContent.hero.description;
  }

  // プロフィールセクション
  if (siteContent.contactSection) {
    const cAvatar = document.getElementById('contact-avatar');
    if (cAvatar && siteContent.contactSection.avatar) {
      cAvatar.src = siteContent.contactSection.avatar;
    }
    
    const cName = document.getElementById('contact-name');
    if (cName && siteContent.contactSection.name) {
      cName.innerHTML = siteContent.contactSection.name;
    }

    const cDesc = document.getElementById('contact-desc');
    if (cDesc) cDesc.innerHTML = siteContent.contactSection.description;

    // チャームポイント描画
    const detailsList = document.getElementById('contact-details-list');
    if (detailsList && siteContent.contactSection.details) {
      detailsList.innerHTML = '';
      siteContent.contactSection.details.forEach(detail => {
        const item = document.createElement('div');
        item.className = 'editorial-list-item';
        item.innerHTML = `<strong>${detail.label}</strong><span>${detail.value}</span>`;
        detailsList.appendChild(item);
      });
    }

    // お気に入り描画
    const favoritesGrid = document.getElementById('contact-favorites-grid');
    if (favoritesGrid && siteContent.contactSection.favorites) {
      favoritesGrid.innerHTML = '';
      siteContent.contactSection.favorites.forEach(fav => {
        const card = document.createElement('div');
        card.className = 'editorial-fav-card';
        card.innerHTML = `
          <div class="fav-header">
            <span class="fav-icon">${fav.icon}</span>
            <span class="fav-name">${fav.label}</span>
          </div>
          <p class="fav-desc">${fav.desc}</p>
        `;
        favoritesGrid.appendChild(card);
      });
    }
  }

  // ==========================================
  // 2. 制作サービス紹介カードの動的描画 (写真重視)
  // ==========================================
  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid) {
    servicesGrid.innerHTML = '';
    toolsData.forEach(tool => {
      if (tool.isVisible === false) return;

      const card = document.createElement('div');
      card.className = 'service-card reveal-on-scroll';
      
      const visualSrc = tool.image || tool.thumbIcon || '';
      const displayTitle = tool.title || tool.thumbLabel || 'No Title';

      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${visualSrc}" alt="${displayTitle}" class="card-img" loading="lazy" />
        </div>
        <div class="card-body">
          <span class="card-tag">${tool.tag || 'PRODUCT'}</span>
          <h3 class="card-title">${displayTitle}</h3>
          <p class="card-desc">${tool.description || ''}</p>
          <a href="${tool.url || '#'}" target="_blank" rel="noopener noreferrer" class="button btn-primary card-action">
            サイトを開く <span class="arrow">→</span>
          </a>
        </div>
      `;
      servicesGrid.appendChild(card);
    });
  }


  // ==========================================
  // 4. モバイルメニュー開閉
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      navLinks.classList.toggle('is-active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('is-active');
      });
    });
  }

  // ==========================================
  // 5. アンビエント・カーソルグロウの追従
  // ==========================================
  const initCursorGlow = () => {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;

      requestAnimationFrame(updateGlow);
    };
    updateGlow();
  };
  initCursorGlow();

  // ==========================================
  // 6. 3D Tilt 効果
  // ==========================================
  const initTiltEffect = () => {
    if (window.matchMedia('(hover: none)').matches) return;

    const tiltElements = document.querySelectorAll('.main-visual-wrap, .service-card, .concept-card, .profile-avatar-container');
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const maxRotate = 4;
        const rotateX = -y * maxRotate;
        const rotateY = x * maxRotate;

        el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  };
  setTimeout(initTiltEffect, 100);

  // ==========================================
  // 7. スクロール連動のアクティブナビゲーション
  // ==========================================
  const initActiveNavScroll = () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrolled = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // ヘッダーの高さ考慮
        if (scrolled >= sectionTop - 120) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  };
  initActiveNavScroll();

  // ==========================================
  // 8. スクロール連動表示フェードイン (Reveal)
  // ==========================================
  const initScrollReveal = () => {
    // 最初の表示確認時点、または動的挿入完了後
    const getRevealElements = () => {
      const els = [
        document.querySelector('.main-visual-wrap'),
        document.querySelector('.hero-grid'),
        document.querySelector('.profile-layout'),
        document.querySelector('.section-header-editorial'),
        document.querySelector('.concept-card')
      ];
      
      // 動的カードおよびリスト項目を追加
      document.querySelectorAll('.service-card, .editorial-list-item, .editorial-fav-card').forEach(el => {
        els.push(el);
      });

      return els;
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05
    };

    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // ロード完了後に要素群を監視
    setTimeout(() => {
      const revealElements = getRevealElements();
      revealElements.forEach(el => {
        if (el) {
          el.classList.add('reveal-on-scroll');
          observer.observe(el);
        }
      });
    }, 200);
  };
  
  initScrollReveal();
});
