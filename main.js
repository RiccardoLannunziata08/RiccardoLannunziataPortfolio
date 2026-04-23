// === MOBILE MENU ===
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// === SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate subject bars when they appear
      if (entry.target.classList.contains('subject-row')) {
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, 200);
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(el => {
  observer.observe(el);
});

// === NAV SCROLL EFFECT ===
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
    nav.style.boxShadow = '0 8px 30px rgba(9,21,80,0.1)';
  } else {
    nav.classList.remove('scrolled');
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// === SMOOTH PAGE TRANSITIONS ===
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
      window.location.href = href;
    }, 280);
  });
});

// Fade in on page load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';
window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// === ACTIVITY DETAILS OVERLAY ===
const detailsOverlay = document.getElementById('detailsOverlay');
const detailsClose = document.getElementById('detailsClose');

if (detailsOverlay) {
  const detailsTitle = document.getElementById('detailsTitle');
  const detailsDescription = document.getElementById('detailsDescription');
  const detailsRole = document.getElementById('detailsRole');
  const detailsResults = document.getElementById('detailsResults');
  const detailsTech = document.getElementById('detailsTech');
  const detailsSoft = document.getElementById('detailsSoft');
  const detailsReflection = document.getElementById('detailsReflection');

  const openDetails = (button) => {
    detailsTitle.textContent = button.dataset.detailTitle || 'Dettagli attività';
    detailsDescription.textContent = button.dataset.detailDescription || '';
    detailsRole.textContent = button.dataset.detailRole || '';
    detailsResults.textContent = button.dataset.detailResults || '';
    detailsTech.textContent = button.dataset.detailTech || '';
    detailsSoft.textContent = button.dataset.detailSoft || '';
    detailsReflection.textContent = button.dataset.detailReflection || '';

    detailsOverlay.classList.add('open');
    detailsOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    detailsOverlay.classList.remove('open');
    detailsOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.details-toggle').forEach((button) => {
    button.addEventListener('click', () => openDetails(button));
  });

  if (detailsClose) {
    detailsClose.addEventListener('click', closeDetails);
  }

  detailsOverlay.addEventListener('click', (event) => {
    if (event.target === detailsOverlay) {
      closeDetails();
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && detailsOverlay.classList.contains('open')) {
      closeDetails();
    }
  });
}
