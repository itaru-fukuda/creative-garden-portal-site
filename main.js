import toolsData from './data.json';
import siteContent from './content.json';

document.addEventListener('DOMContentLoaded', () => {
  // === 1. サイト基本設定の反映 ===
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
  }

  // ツールセクションのヘッダー反映
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

  // === 2. アシンメトリースプリットプロフィールの描画 ===
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
    
    // SNSリンク描画
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

    // チャームポイント (Elegant Table) 描画
    const detailsList = document.getElementById('contact-details-list');
    if (detailsList && siteContent.contactSection.details) {
      detailsList.innerHTML = '';
      siteContent.contactSection.details.forEach(detail => {
        const item = document.createElement('div');
        item.className = 'elegant-list-item';
        item.innerHTML = `<strong>${detail.label}</strong><span>${detail.value}</span>`;
        detailsList.appendChild(item);
      });
    }

    // 好きなものたち (Elegant List) 描画
    const favoritesGrid = document.getElementById('contact-favorites-grid');
    if (favoritesGrid && siteContent.contactSection.favorites) {
      favoritesGrid.innerHTML = '';
      siteContent.contactSection.favorites.forEach(fav => {
        const item = document.createElement('div');
        item.className = 'elegant-fav-item';
        item.innerHTML = `
          <div class="fav-title-wrap">
            <span class="fav-icon">${fav.icon}</span>
            <span class="fav-name">${fav.label}</span>
          </div>
          <p class="fav-desc">${fav.desc}</p>
        `;
        favoritesGrid.appendChild(item);
      });
    }
  }

  // フッターの反映
  if (siteContent.footer) {
    const fCopy = document.getElementById('footer-copy');
    if (fCopy) fCopy.innerHTML = siteContent.footer.copyright;
  }

  // === 3. ツールカードのレンダリング ===
  const toolGrid = document.getElementById('tool-grid');
  if (toolGrid) {
    toolsData.forEach(tool => {
      if (tool.isVisible === false) return;

      const article = document.createElement('a');
      article.href = tool.url || '#';
      article.className = `tool-card ${tool.colorClass}`;
      article.target = '_blank';
      article.rel = 'noopener noreferrer';
      
      let thumbIconContent = tool.thumbIcon || '';
      if (tool.thumbIcon && tool.thumbIcon.match(/\.(png|jpe?g|gif|svg|webp)$/i)) {
        thumbIconContent = `<img src="${tool.thumbIcon}" alt="アイコン" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;" />`;
      }

      let bgImageHtml = '';
      if (tool.image) {
        bgImageHtml = `<img src="${tool.image}" alt="${tool.title || ''}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; z-index: 0;" />`;
      }

      let thumbnailHtml = `
        <div class="thumbnail ${tool.image ? 'has-image' : (tool.thumbGradient || 'thumb-gradient-1')}" role="img" aria-label="${tool.title || 'ツール'}のサムネイル" style="position: relative; overflow: hidden;">
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
  }

  // ハンバーガーメニューの開閉制御
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

  // === 4. Luca's 24H 時間帯切り替えシステム (Interactive Theme System) ===
  const applyTheme = (themeName) => {
    // bodyのテーマクラス切り替え
    document.body.classList.remove('theme-morning', 'theme-daytime', 'theme-sunset', 'theme-night');
    document.body.classList.add(`theme-${themeName}`);

    // アバターにシネマティックブラートランジションをかける
    const showcaseAvatar = document.getElementById('hero-avatar-showcase');
    if (showcaseAvatar) {
      showcaseAvatar.style.filter = 'blur(12px) scale(0.95)';
      showcaseAvatar.style.opacity = '0.3';
      setTimeout(() => {
        showcaseAvatar.style.filter = '';
        showcaseAvatar.style.opacity = '';
      }, 350);
    }

    // ダイヤルスイッチのアクティブ状態の更新
    const dials = document.querySelectorAll('.time-dial-btn');
    dials.forEach(dial => {
      const isActive = dial.getAttribute('data-time') === themeName;
      if (isActive) {
        dial.classList.add('active');
        dial.setAttribute('aria-checked', 'true');
      } else {
        dial.classList.remove('active');
        dial.setAttribute('aria-checked', 'false');
      }
    });

    // 吹き出しメッセージの更新
    if (siteContent.luca24h && siteContent.luca24h[themeName]) {
      const data = siteContent.luca24h[themeName];
      const qTime = document.getElementById('quote-time-label');
      const qSub = document.getElementById('quote-time-sub');
      const qText = document.getElementById('quote-text');
      const qDesc = document.getElementById('quote-desc');

      if (qTime) qTime.textContent = data.timeLabel || '';
      if (qSub) qSub.textContent = data.subLabel || '';
      if (qText) qText.textContent = `「${data.quote || ''}」`;
      if (qDesc) qDesc.textContent = data.desc || '';
    }
  };

  // 時刻に基づいた自動時間帯判定
  const determineTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 11) return 'morning';
    if (hours >= 11 && hours < 17) return 'daytime';
    if (hours >= 17 && hours < 20) return 'sunset';
    return 'night';
  };

  // ダイヤルスイッチのイベント紐付け
  const dials = document.querySelectorAll('.time-dial-btn');
  dials.forEach(dial => {
    dial.addEventListener('click', () => {
      const selectedTime = dial.getAttribute('data-time');
      if (selectedTime) applyTheme(selectedTime);
    });
  });

  // 初期ロード時のテーマ適用
  applyTheme(determineTimeOfDay());


  // === 5. アンビエント・カーソルライトの追従制御 ===
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
      // 慣性イージングによる流麗な追従 (Lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;

      requestAnimationFrame(updateGlow);
    };
    updateGlow();
  };
  initCursorGlow();


  // === 6. カードの 3D Tilt エフェクト (マイルドに変更) ===
  const initTiltEffect = () => {
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll('.tool-card, .portrait-frame');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // あまり激しく揺れないようマイルド（最大 4 度）に設定
        const maxRotate = 4;
        const rotateX = -y * maxRotate;
        const rotateY = x * maxRotate;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  };
  
  setTimeout(initTiltEffect, 100);


  // === 7. スクロール連動フェードイン ===
  const initScrollReveal = () => {
    const elementsToReveal = [
      document.querySelector('.hero-copy'),
      document.querySelector('.hero-stage'),
      document.querySelector('.section-heading'),
      document.querySelector('.about-card'),
      document.querySelector('.author-section'),
      document.querySelector('.time-dial-container')
    ];

    const cards = document.querySelectorAll('.tool-card, .elegant-fav-item, .elegant-list-item');
    cards.forEach(card => elementsToReveal.push(card));

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.06
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
  
  setTimeout(initScrollReveal, 150);
});
