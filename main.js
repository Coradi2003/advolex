/* ========================================
   ADVOLEX — JavaScript
   Interactions, Animations, Tabs, Mobile
   ======================================== */

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* ===== MOBILE NAV ===== */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===== SMOOTH ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-link[href^="#"]');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(sec => observerNav.observe(sec));

/* ===== AREAS TABS ===== */
const tabPj = document.getElementById('tab-pj');
const tabPf = document.getElementById('tab-pf');
const areasPj = document.getElementById('areas-pj');
const areasPf = document.getElementById('areas-pf');

function switchTab(active, inactive, show, hide) {
  active.classList.add('active');
  inactive.classList.remove('active');
  hide.classList.add('hidden');
  show.classList.remove('hidden');
  // Trigger reveal animations on newly shown cards
  show.querySelectorAll('.area-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 40);
  });
}

tabPj.addEventListener('click', () => switchTab(tabPj, tabPf, areasPj, areasPf));
tabPf.addEventListener('click', () => switchTab(tabPf, tabPj, areasPf, areasPj));

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll(
  '.feature-item, .area-card, .diferencial-card, .depoimento-card, .contato-item, .about-content, .about-image-wrap'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ===== ABOUT IMAGE FALLBACK ===== */
const aboutImg = document.getElementById('about-office-img');
if (aboutImg) {
  aboutImg.addEventListener('error', () => {
    aboutImg.parentElement.style.background = 'linear-gradient(135deg, #1A1A1A, #1E1810)';
    aboutImg.style.display = 'none';
  });
}

/* ===== HERO BG FALLBACK ===== */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  const testImg = new Image();
  testImg.src = 'images/hero.jpg';
  testImg.onerror = () => {
    heroBg.style.background = 'linear-gradient(135deg, #0D0B08 0%, #1A1410 50%, #0A0A0A 100%)';
  };
}

/* ===== WHATSAPP FORM ===== */
function sendWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const phone = document.getElementById('form-phone').value.trim();
  const area = document.getElementById('form-area').value;
  const message = document.getElementById('form-message').value.trim();

  if (!name || !phone) {
    alert('Por favor, preencha seu nome e telefone.');
    return;
  }

  const text = [
    `*Nova consulta — Site Advolex*`,
    ``,
    `*Nome:* ${name}`,
    `*Telefone:* ${phone}`,
    area ? `*Área de interesse:* ${area}` : '',
    message ? `*Mensagem:* ${message}` : '',
  ].filter(Boolean).join('\n');

  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/5541997289680?text=${encoded}`, '_blank', 'noopener');
}

/* ===== NUMBER COUNTER ANIMATION ===== */
function animateNumber(element, target, prefix = '', suffix = '') {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();

  const isPlus = suffix.startsWith('+') || prefix.startsWith('+');
  const numTarget = parseInt(target.replace(/\D/g, ''), 10);

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * numTarget);

    element.textContent = prefix + current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = prefix + target + '';
    }
  }

  requestAnimationFrame(update);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(el => {
        const original = el.textContent;
        el.textContent = original; // keep as is - just animate once
        el.style.opacity = '0';
        setTimeout(() => {
          el.style.transition = 'opacity 0.3s';
          el.style.opacity = '1';
        }, 100);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ===== PARALLAX SUBTLE ===== */
const heroBgEl = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (!heroBgEl) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroBgEl.style.transform = `scale(1.0) translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });

/* ===== CURSOR GLOW EFFECT ON CARDS ===== */
document.querySelectorAll('.area-card, .diferencial-card, .depoimento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,106,0.06) 0%, transparent 60%), var(--dark-card)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});
