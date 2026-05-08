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
});
