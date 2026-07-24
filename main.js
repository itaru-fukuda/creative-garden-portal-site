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
    if (hHeadline) {
      const hasExpandedBrand = hHeadline.querySelector('.brand-word');
      if (hasExpandedBrand) {
        const brandLabel = [siteContent.hero.fullName || siteContent.hero.headline, siteContent.hero.translation]
          .filter(Boolean)
          .join('。');
        hHeadline.setAttribute('aria-label', brandLabel);
      } else {
        hHeadline.innerHTML = siteContent.hero.headline;
      }
    }
    document.querySelectorAll('[data-brand-translation]').forEach(translation => {
      if (siteContent.hero.translation) translation.textContent = siteContent.hero.translation;
    });
    // content.json の設定に応じて動画または静止画を表示する
    const media = siteContent.hero.media || {};
    const heroVideo = document.getElementById('main-visual-video');
    const heroVideoSource = document.getElementById('main-visual-video-source');
    const heroImage = document.getElementById('main-visual-image');
    const heroWrap = document.querySelector('.main-visual-wrap');
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    const showImage = media.type === 'image';

    if (heroWrap) {
      heroWrap.style.setProperty('--hero-mobile-object-position', media.mobileObjectPosition || '50% center');
    }

    const updateHeroImageSource = () => {
      if (!heroImage || !showImage) return;
      const mobileImageSrc = typeof media.mobileImageSrc === 'string' ? media.mobileImageSrc.trim() : '';
      const nextImageSrc = mobileMediaQuery.matches && mobileImageSrc ? mobileImageSrc : media.imageSrc;
      if (nextImageSrc && heroImage.getAttribute('src') !== nextImageSrc) {
        heroImage.src = nextImageSrc;
      }
    };

    if (heroVideo && heroVideoSource && heroImage) {
      if (media.poster) heroVideo.poster = media.poster;
      if (media.alt) {
        heroVideo.setAttribute('aria-label', media.alt);
        heroImage.alt = media.alt;
      }

      if (showImage) {
        heroVideo.pause();
        heroVideo.hidden = true;
        heroImage.hidden = false;
        updateHeroImageSource();
      } else {
        heroImage.hidden = true;
        heroVideo.hidden = false;
        heroVideo.muted = true;
        if (media.videoSrc && heroVideoSource.getAttribute('src') !== media.videoSrc) {
          heroVideoSource.src = media.videoSrc;
          heroVideo.load();
        }
        heroVideo.play().catch(() => {
          // 自動再生が制限された場合はポスター画像を表示する
        });
      }
    }

    mobileMediaQuery.addEventListener('change', updateHeroImageSource);

    const hDesc = document.getElementById('hero-desc');
    if (hDesc) hDesc.innerHTML = siteContent.hero.description;
    const primaryButton = document.getElementById('cta-primary');
    if (primaryButton && siteContent.hero.primaryButton) {
      primaryButton.textContent = siteContent.hero.primaryButton.text;
      primaryButton.href = siteContent.hero.primaryButton.url;
    }
    const secondaryButton = document.getElementById('cta-secondary');
    if (secondaryButton && siteContent.hero.secondaryButton) {
      secondaryButton.textContent = siteContent.hero.secondaryButton.text;
      secondaryButton.href = siteContent.hero.secondaryButton.url;
    }

  }

  // Heroを通常のスクロール量に合わせて段階的に展開する
  const initHeroScrollStory = () => {
    const heroSection = document.querySelector('.hero-section');
    const heroWrap = document.querySelector('.main-visual-wrap');
    const scrollLabel = heroWrap?.querySelector('.hero-scroll-label');
    if (!heroSection || !heroWrap) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrameId = 0;

    const updateHeroState = () => {
      animationFrameId = 0;

      if (reducedMotionQuery.matches) {
        heroWrap.style.setProperty('--hero-progress', '1');
        heroWrap.classList.remove(
          'is-closing',
          'is-about-revealing',
          'is-about-letter-1',
          'is-about-letter-2',
          'is-about-letter-3',
          'is-about-letter-4',
          'is-about-letter-5',
          'is-about-complete',
          'is-about-cue-visible',
          'is-about-cue-active'
        );
        heroWrap.classList.add(
          'is-reduced-motion',
          'is-name-expanded',
          'is-word-1-expanded',
          'is-word-2-expanded',
          'is-word-3-expanded',
          'is-word-4-expanded',
          'is-details-visible',
          'is-cta-visible'
        );
        return;
      }

      heroWrap.classList.remove('is-reduced-motion');
      const scrollRange = Math.max(heroSection.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-heroSection.getBoundingClientRect().top / scrollRange, 0), 1);
      const storyProgress = Math.min(progress / 0.8, 1);

      heroWrap.style.setProperty('--hero-progress', progress.toFixed(4));
      const isClosing = storyProgress >= 0.58;
      heroWrap.classList.toggle('is-name-expanded', storyProgress >= 0.06 && storyProgress < 0.94);
      heroWrap.classList.toggle('is-word-1-expanded', storyProgress >= 0.08 && storyProgress < 0.9);
      heroWrap.classList.toggle('is-word-2-expanded', storyProgress >= 0.14 && storyProgress < 0.84);
      heroWrap.classList.toggle('is-word-3-expanded', storyProgress >= 0.2 && storyProgress < 0.78);
      heroWrap.classList.toggle('is-word-4-expanded', storyProgress >= 0.26 && storyProgress < 0.72);
      heroWrap.classList.toggle('is-details-visible', storyProgress >= 0.34 && storyProgress < 0.66);
      heroWrap.classList.toggle('is-cta-visible', storyProgress >= 0.42 && storyProgress < 0.58);
      heroWrap.classList.toggle('is-closing', isClosing);
      heroWrap.classList.toggle('is-about-revealing', progress >= 0.78);
      heroWrap.classList.toggle('is-about-letter-1', progress >= 0.78);
      heroWrap.classList.toggle('is-about-letter-2', progress >= 0.81);
      heroWrap.classList.toggle('is-about-letter-3', progress >= 0.84);
      heroWrap.classList.toggle('is-about-letter-4', progress >= 0.87);
      heroWrap.classList.toggle('is-about-letter-5', progress >= 0.9);
      heroWrap.classList.toggle('is-about-complete', progress >= 0.9);
      heroWrap.classList.toggle('is-about-cue-visible', progress >= 0.93);
      heroWrap.classList.toggle('is-about-cue-active', progress >= 0.96);
      if (scrollLabel) {
        scrollLabel.textContent = progress >= 0.9
          ? 'About RASU'
          : progress >= 0.78
            ? 'ENTER ABOUT'
            : isClosing
              ? 'CONTINUE'
              : 'SCROLL TO DISCOVER';
      }
    };

    const requestHeroUpdate = () => {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(updateHeroState);
    };

    window.addEventListener('scroll', requestHeroUpdate, { passive: true });
    window.addEventListener('resize', requestHeroUpdate);
    reducedMotionQuery.addEventListener('change', requestHeroUpdate);
    updateHeroState();
  };
  initHeroScrollStory();

  // RASU紹介セクション
  if (siteContent.aboutSection) {
    const aboutEyebrow = document.getElementById('about-eyebrow');
    if (aboutEyebrow) aboutEyebrow.textContent = siteContent.aboutSection.eyebrow;
    const aboutHeadline = document.getElementById('about-headline');
    if (aboutHeadline) aboutHeadline.innerHTML = siteContent.aboutSection.headline;
    const aboutDesc = document.getElementById('about-desc');
    if (aboutDesc) aboutDesc.innerHTML = siteContent.aboutSection.description;
  }

  // 制作コンテンツセクション
  if (siteContent.toolsSection) {
    const toolsEyebrow = document.getElementById('tools-eyebrow');
    if (toolsEyebrow) toolsEyebrow.textContent = siteContent.toolsSection.eyebrow;
    const toolsHeadline = document.getElementById('tools-headline');
    if (toolsHeadline) toolsHeadline.innerHTML = siteContent.toolsSection.headline;
    const toolsDesc = document.getElementById('tools-desc');
    if (toolsDesc) toolsDesc.innerHTML = siteContent.toolsSection.description;
  }

  // プロフィールセクション
  if (siteContent.contactSection) {
    const cEyebrow = document.getElementById('contact-eyebrow');
    if (cEyebrow) cEyebrow.textContent = siteContent.contactSection.eyebrow;
    const cHeadline = document.getElementById('contact-headline');
    if (cHeadline) cHeadline.innerHTML = siteContent.contactSection.headline;
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

    // 経歴描画：content.json の career 配列から生成
    const careerTitle = document.getElementById('contact-career-title');
    if (careerTitle && siteContent.contactSection.careerTitle) {
      careerTitle.textContent = siteContent.contactSection.careerTitle;
    }

    const careerList = document.getElementById('contact-career-list');
    if (careerList && Array.isArray(siteContent.contactSection.career)) {
      careerList.innerHTML = '';
      siteContent.contactSection.career.forEach(career => {
        const item = document.createElement('article');
        item.className = 'career-item';
        item.innerHTML = `
          ${career.period ? `<p class="career-period">${career.period}</p>` : ''}
          <h4 class="career-title">${career.title}</h4>
          ${career.description ? `<p class="career-description">${career.description}</p>` : ''}
        `;
        careerList.appendChild(item);
      });
    }

    // X・noteへの導線
    const socialLinksGrid = document.getElementById('social-links-grid');
    if (socialLinksGrid && siteContent.contactSection.links) {
      socialLinksGrid.innerHTML = '';
      siteContent.contactSection.links.forEach(link => {
        const anchor = document.createElement('a');
        anchor.className = 'social-link-card';
        anchor.href = link.url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.setAttribute('aria-label', `${link.label}を開く`);
        anchor.innerHTML = `
          <span class="social-link-icon" aria-hidden="true">${link.text}</span>
          <span class="social-link-copy">
            <strong>${link.label}</strong>
            <span>${link.description}</span>
          </span>
          <span class="social-link-arrow" aria-hidden="true">↗</span>
        `;
        socialLinksGrid.appendChild(anchor);
      });
    }
  }

  // 外部リンクセクション
  if (siteContent.linksSection) {
    const linksEyebrow = document.getElementById('links-eyebrow');
    if (linksEyebrow) linksEyebrow.textContent = siteContent.linksSection.eyebrow;
    const linksHeadline = document.getElementById('links-headline');
    if (linksHeadline) linksHeadline.innerHTML = siteContent.linksSection.headline;
    const linksDesc = document.getElementById('links-desc');
    if (linksDesc) linksDesc.innerHTML = siteContent.linksSection.description;
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
        <a href="${tool.url || '#'}" target="_blank" rel="noopener noreferrer" class="card-image-wrap card-image-link"
          aria-label="${displayTitle}のサイトを開く">
          <img src="${visualSrc}" alt="${displayTitle}" class="card-img" loading="lazy" />
        </a>
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
      const isOpen = menuToggle.classList.toggle('is-active');
      navLinks.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'メニューを開く');
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

    const tiltElements = document.querySelectorAll('.service-card, .concept-card, .profile-avatar-container, .social-link-card');
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
        document.querySelector('.concept-card'),
        document.querySelector('#projects .section-header-editorial'),
        document.querySelector('.profile-layout'),
        document.querySelector('.links-heading')
      ];
      
      // 動的カードおよびリスト項目を追加
      document.querySelectorAll('.service-card, .editorial-list-item, .career-item, .social-link-card').forEach(el => {
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
