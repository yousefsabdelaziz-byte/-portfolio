/* =========================================
   PORTFOLIO - Eng Yousef S Abdelaziz
   Main JavaScript
   ========================================= */

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// إغلاق المنيو لما تضغط على أي لينك
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// إغلاق المنيو لما تضغط بره
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

/* ---------- TYPED TEXT EFFECT ---------- */
const roles = [
  'Web Developer',
  'Software Engineer',
  'Full-Stack Developer',
  'AI Web Builder',
  'Problem Solver',
];

let roleIndex    = 0;
let charIndex    = 0;
let isDeleting   = false;
const typedEl    = document.getElementById('typedText');
const typeSpeed  = 90;
const deleteSpeed = 50;
const pauseTime  = 2000;

function typeEffect() {
  if (!typedEl) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
}

// ابدأ بعد شوية
setTimeout(typeEffect, 800);

/* ---------- AOS — SCROLL ANIMATIONS ---------- */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      aosObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

aosElements.forEach(el => aosObserver.observe(el));

/* ---------- BACK TO TOP ---------- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // ارتفاع الـ navbar
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- CONTACT FORM ---------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn  = this.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    btn.innerHTML  = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#22c55e';
    btn.disabled   = true;

    setTimeout(() => {
      btn.innerHTML  = orig;
      btn.style.background = '';
      btn.disabled   = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ---------- SKILL CARDS — HOVER GLOW ---------- */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = e.clientX - rect.left;
    const y     = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });
});

/* ---------- PROJECT CARDS — TILT EFFECT ---------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = (e.clientX - rect.left) / rect.width  - 0.5;
    const y      = (e.clientY - rect.top)  / rect.height - 0.5;
    const tiltX  = y * 6;
    const tiltY  = -x * 6;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

/* ---------- COUNTER ANIMATION FOR HERO STATS ---------- */
function animateCounter(el, target, duration = 1500) {
  let start     = 0;
  const isFloat = target % 1 !== 0;
  const step    = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = isFloat
      ? (eased * target).toFixed(1)
      : Math.floor(eased * target);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// شغّل الـ counters لما الـ hero يظهر
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statNums = heroStats.querySelectorAll('.stat-num');
  const targets  = [4, 10, 100];
  const suffixes = ['+', '+', '%'];

  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      statNums.forEach((el, i) => {
        el.dataset.suffix = suffixes[i];
        animateCounter(el, targets[i]);
      });
      heroObserver.unobserve(heroStats);
    }
  }, { threshold: 0.5 });

  heroObserver.observe(heroStats);
}

/* ---------- NAVBAR OVERLAY ON MOBILE ---------- */
const overlay = document.createElement('div');
overlay.style.cssText = `
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  z-index: 998; display: none; backdrop-filter: blur(4px);
`;
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
  overlay.style.display = navLinks.classList.contains('open') ? 'block' : 'none';
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  overlay.style.display = 'none';
});

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
});
