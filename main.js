import toolsData from './data.json';
import siteContent from './content.json';

document.addEventListener('DOMContentLoaded', () => {
  // サイト設定の反映
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

  // ナビゲーションの反映
  if (siteContent.nav) {
    const nTools = document.getElementById('nav-tools');
    if (nTools) nTools.innerHTML = siteContent.nav.tools;
    const nAbout = document.getElementById('nav-about');
    if (nAbout) nAbout.innerHTML = siteContent.nav.about;
    const nContact = document.getElementById('nav-contact');
    if (nContact) nContact.innerHTML = siteContent.nav.contact;
  }

  // ヒーローセクションの反映
  if (siteContent.hero) {
    const hEyebrow = document.getElementById('hero-eyebrow');
    if (hEyebrow) hEyebrow.innerHTML = siteContent.hero.eyebrow;
    const hHeadline = document.getElementById('hero-headline');
    if (hHeadline) hHeadline.innerHTML = siteContent.hero.headline;
    const hDesc = document.getElementById('hero-desc');
    if (hDesc) hDesc.innerHTML = siteContent.hero.description;
    
    const hBtnPri = document.getElementById('hero-btn-primary');
    if (hBtnPri) {
      hBtnPri.innerHTML = siteContent.hero.primaryButton.text;
      hBtnPri.href = siteContent.hero.primaryButton.url;
    }
    const hBtnSec = document.getElementById('hero-btn-secondary');
    if (hBtnSec) {
      hBtnSec.innerHTML = siteContent.hero.secondaryButton.text;
      hBtnSec.href = siteContent.hero.secondaryButton.url;
    }

    const hBadge = document.getElementById('hero-idol-badge');
    if (hBadge) hBadge.innerHTML = siteContent.hero.idolCardBadge;
    const hIdolText = document.getElementById('hero-idol-text');
    if (hIdolText) hIdolText.innerHTML = siteContent.hero.idolCardText;

    if (siteContent.hero.chips && siteContent.hero.chips.length >= 3) {
      const c1 = document.getElementById('hero-chip-1');
      if (c1) c1.innerHTML = siteContent.hero.chips[0];
      const c2 = document.getElementById('hero-chip-2');
      if (c2) c2.innerHTML = siteContent.hero.chips[1];
      const c3 = document.getElementById('hero-chip-3');
      if (c3) c3.innerHTML = siteContent.hero.chips[2];
    }
  }

  // ツールセクションの反映
  if (siteContent.toolsSection) {
    const tEyebrow = document.getElementById('tools-eyebrow');
    if (tEyebrow) tEyebrow.innerHTML = siteContent.toolsSection.eyebrow;
    const tHeadline = document.getElementById('tools-headline');
    if (tHeadline) tHeadline.innerHTML = siteContent.toolsSection.headline;
    const tDesc = document.getElementById('tools-desc');
    if (tDesc) tDesc.innerHTML = siteContent.toolsSection.description;
  }

  // コンセプトセクションの反映
  if (siteContent.aboutSection) {
    const aEyebrow = document.getElementById('about-eyebrow');
    if (aEyebrow) aEyebrow.innerHTML = siteContent.aboutSection.eyebrow;
    const aHeadline = document.getElementById('about-headline');
    if (aHeadline) aHeadline.innerHTML = siteContent.aboutSection.headline;
    const aDesc = document.getElementById('about-desc');
    if (aDesc) aDesc.innerHTML = siteContent.aboutSection.description;
  }

  // コンタクトセクションの反映
  if (siteContent.contactSection) {
    const cEyebrow = document.getElementById('contact-eyebrow');
    if (cEyebrow) cEyebrow.innerHTML = siteContent.contactSection.eyebrow;
    const cHeadline = document.getElementById('contact-headline');
    if (cHeadline) cHeadline.innerHTML = siteContent.contactSection.headline;
    
    const cAvatar = document.getElementById('contact-avatar');
    if (cAvatar && siteContent.contactSection.avatar) {
      cAvatar.src = siteContent.contactSection.avatar;
    } else if (cAvatar) {
      cAvatar.style.display = 'none';
    }
    
    const cName = document.getElementById('contact-name');
    if (cName && siteContent.contactSection.name) {
      cName.innerHTML = siteContent.contactSection.name;
    }

    const cDesc = document.getElementById('contact-desc');
    if (cDesc) cDesc.innerHTML = siteContent.contactSection.description;
    
    const cLinks = document.getElementById('contact-links');
    if (cLinks && siteContent.contactSection.links) {
      cLinks.innerHTML = '';
      siteContent.contactSection.links.forEach(link => {
        const a = document.createElement('a');
        a.className = `button ${link.type || 'primary'}`;
        a.href = link.url || '#';
        a.innerHTML = link.text || '';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        cLinks.appendChild(a);
      });
    }
  }

  // フッターの反映
  if (siteContent.footer) {
    const fCopy = document.getElementById('footer-copy');
    if (fCopy) fCopy.innerHTML = siteContent.footer.copyright;
  }

  const toolGrid = document.getElementById('tool-grid');
  
  if (!toolGrid) return;

  // Render cards
  toolsData.forEach(tool => {
    if (tool.isVisible === false) return;

    const article = document.createElement('a');
    article.href = tool.url || '#';
    article.className = `tool-card ${tool.colorClass}`;
    article.target = '_blank';
    article.rel = 'noopener noreferrer';
    
    let thumbIconContent = tool.thumbIcon || '';
    if (tool.thumbIcon && tool.thumbIcon.match(/\.(png|jpe?g|gif|svg|webp)$/i)) {
      thumbIconContent = `<img src="${tool.thumbIcon}" alt="アイコン" style="width: 100%; height: 100%; object-fit: cover; border-radius: 24px;" />`;
    }

    let bgImageHtml = '';
    if (tool.image) {
      bgImageHtml = `<img src="${tool.image}" alt="${tool.title || ''}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0;" />`;
    }

    let thumbnailHtml = `
      <div class="thumbnail ${tool.image ? '' : (tool.thumbGradient || 'thumb-gradient-1')}" role="img" aria-label="${tool.title || 'ツール'}のサムネイル" style="position: relative; overflow: hidden;">
        ${bgImageHtml}
        ${tool.thumbIcon ? `<span class="thumb-icon" style="position: relative; z-index: 1;">${thumbIconContent}</span>` : ''}
        ${tool.thumbLabel ? `<span class="thumb-label" style="position: relative; z-index: 1; margin-top: 8px;">${tool.thumbLabel}</span>` : ''}
      </div>
    `;

    article.innerHTML = `
      ${thumbnailHtml}
      <div class="tool-body">
        ${tool.tag ? `<span class="tag">${tool.tag}</span>` : ''}
        ${tool.title ? `<h3>${tool.title}</h3>` : ''}
        ${tool.description ? `<p>${tool.description}</p>` : ''}
        <span class="card-link">
          サイトを開く <span>→</span>
        </span>
      </div>
    `;
    
    toolGrid.appendChild(article);
  });

  // ハンバーガーメニューの開閉制御
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      navLinks.classList.toggle('is-active');
    });

    // メニュー内のリンクをクリックした時に閉じる
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('is-active');
      });
    });
  }

  // === 1. マウス追従キラキラトレイル ===
  const createSparkleTrail = () => {
    let lastX = 0;
    let lastY = 0;
    const minDistance = 18; // パーティクル間の最小距離
    const colors = ['#ff64b6', '#42c7ff', '#ffd84f', '#9b6bff', '#7ff7d4'];
    const shapes = ['✦', '✧', '★', '✿', '•'];

    window.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist < minDistance) return;

      lastX = x;
      lastY = y;

      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';
      particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
      
      const tx = (Math.random() - 0.5) * 120;
      const ty = -60 - Math.random() * 80;
      const rot = 180 + Math.random() * 360;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    });
  };
  createSparkleTrail();

  // === 2. マスコットキャラクターの目線追跡 (Eye Tracking) ===
  const initMascotEyeTracking = () => {
    const mascotFace = document.querySelector('.mascot-face');
    const eyes = document.querySelectorAll('.eye');
    if (!mascotFace || eyes.length === 0) return;

    window.addEventListener('mousemove', (e) => {
      const rect = mascotFace.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - faceCenterX;
      const dy = e.clientY - faceCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.hypot(dx, dy);

      const maxDistance = 6;
      const moveDist = Math.min(distance * 0.05, maxDistance);

      const moveX = Math.cos(angle) * moveDist;
      const moveY = Math.sin(angle) * moveDist;

      eyes.forEach(eye => {
        eye.style.setProperty('--eye-x', `${moveX}px`);
        eye.style.setProperty('--eye-y', `${moveY}px`);
      });
    });

    window.addEventListener('mouseleave', () => {
      eyes.forEach(eye => {
        eye.style.setProperty('--eye-x', '0px');
        eye.style.setProperty('--eye-y', '0px');
      });
    });
  };
  initMascotEyeTracking();

  // === 3. ツールカードの3D Tiltエフェクト ===
  const initCardTilt = () => {
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const maxRotateX = 8;
        const maxRotateY = 8;

        const rotateX = -y * maxRotateX;
        const rotateY = x * maxRotateY;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        card.style.boxShadow = `${-rotateY * 3}px ${20 + rotateX * 3}px 60px rgba(92, 45, 151, 0.22)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.boxShadow = '';
      });
    });
  };
  initCardTilt();

  // === 4. スクロール連動フェードイン (Scroll Reveal) ===
  const initScrollReveal = () => {
    const elementsToReveal = [
      document.querySelector('.hero-copy'),
      document.querySelector('.hero-stage'),
      document.querySelector('.section-heading'),
      document.querySelector('.about-card'),
      document.querySelector('.author-section')
    ];

    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => elementsToReveal.push(card));

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
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

    elementsToReveal.forEach(el => {
      if (el) {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      }
    });
  };
  initScrollReveal();
});
