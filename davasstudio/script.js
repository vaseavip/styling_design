// ===== FADE-IN ANIMATION ON SCROLL =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL TO SECTION =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });

      // Close mobile menu if open
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    }
  });
});

// ===== KEYBOARD NAVIGATION FOR SLIDER =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    changeSlide(-1);
  } else if (e.key === 'ArrowRight') {
    changeSlide(1);
  }
});

// ===== FORM VALIDATION =====
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const messageInput = this.querySelector('textarea');
    const submitBtn = this.querySelector('button');

    // Basic validation
    if (!nameInput.value.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    if (!messageInput.value.trim()) {
      alert('Please enter a message');
      return;
    }

    // Show success message
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.disabled = true;

    // Reset form after 2 seconds
    setTimeout(() => {
      this.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }, 2000);
  });
}

// ===== INITIAL SETUP =====
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);

  // Trigger fade-in for elements already visible on page load
  document.querySelectorAll('.fade-in').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      observer.observe(el);
    }
  });
});

// ===== MOBILE RESPONSIVENESS =====
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.hero-slider');
if (slider) {
  slider.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false,
  );

  slider.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        changeSlide(1); // Swipe left
      } else if (touchEndX - touchStartX > 50) {
        changeSlide(-1); // Swipe right
      }
    },
    false,
  );
}

// ===== ACCESSIBILITY: FOCUS MANAGEMENT =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
