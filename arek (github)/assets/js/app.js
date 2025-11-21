/* app.js - Enhanced SPA with Dark Mode */

const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const menuItems = document.querySelectorAll('.menu-item');
const themeToggle = document.getElementById('themeToggle');

// Dark Mode
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Active Menu
function setActiveMenu(key) {
  menuItems.forEach(li => {
    if (li.dataset.page === key) li.classList.add('active');
    else li.classList.remove('active');
  });
}

// Show with transition
function showWithTransition(nodeHtml) {
  content.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'page-wrap fade-wrap';
  wrapper.innerHTML = nodeHtml;
  content.appendChild(wrapper);
  requestAnimationFrame(() => wrapper.classList.add('show'));
}

// Load Home
function loadHome() {
  setActiveMenu('home');
  const html = `
    <div class="hero">
      <div class="hero-left">
        <h2>AREK — Are You Arek Jember Enough?</h2>
        <p>Selami kuliner, wisata, dan komoditas Jember. Bersainglah dengan dirimu sendiri lewat quiz singkat.</p>
        <div class="hero-cta">
          <button class="btn-cta" id="start-quiz-cta">🎯 Mulai Quiz</button>
          <button class="btn-cta" id="read-materi-cta" style="background: linear-gradient(135deg, var(--emerald), var(--sea-deep));">📚 Baca Materi</button>
        </div>
      </div>
      <div class="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#8EC5FF"/>
              <stop offset="100%" stop-color="#3A6EA5"/>
            </linearGradient>
          </defs>
          <path d="M0 80 Q90 30 180 80 T360 80 L360 200 L0 200 Z" fill="url(#heroGrad)" opacity="0.2">
            <animate attributeName="d"
              values="M0 80 Q90 30 180 80 T360 80 L360 200 L0 200 Z;
                      M0 70 Q90 120 180 70 T360 70 L360 200 L0 200 Z;
                      M0 80 Q90 30 180 80 T360 80 L360 200 L0 200 Z"
              dur="6s" repeatCount="indefinite"/>
          </path>
          <path d="M0 120 Q90 80 180 120 T360 120 L360 200 L0 200 Z" fill="url(#heroGrad)" opacity="0.15">
            <animate attributeName="d"
              values="M0 120 Q90 80 180 120 T360 120 L360 200 L0 200 Z;
                      M0 110 Q90 150 180 110 T360 110 L360 200 L0 200 Z;
                      M0 120 Q90 80 180 120 T360 120 L360 200 L0 200 Z"
              dur="8s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
    </div>

    <div class="card-grid">
      <div class="card">
        <h4>🍽️ Materi</h4>
        <p class="kecil">Pelajari makanan, wisata, dan komoditas Jember dengan fun facts menarik!</p>
      </div>
      <div class="card">
        <h4>🎯 Mini Quiz</h4>
        <p class="kecil">Tes pengetahuanmu — tiap jawaban ada fun fact yang seru!</p>
      </div>
      <div class="card">
        <h4>💡 Tips</h4>
        <p class="kecil">Disarankan membaca materi sebelum quiz untuk skor lebih baik.</p>
      </div>
    </div>
  `;
  showWithTransition(html);

  setTimeout(() => {
    const startBtn = document.getElementById('start-quiz-cta');
    const readBtn = document.getElementById('read-materi-cta');
    if (startBtn) startBtn.addEventListener('click', () => loadPage('quiz'));
    if (readBtn) readBtn.addEventListener('click', () => loadPage('materi'));
  }, 50);
}

// Load Page Router
function loadPage(page) {
  if (window.innerWidth <= 1000) {
    sidebar.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (page === 'home') loadHome();
  else if (page === 'materi') {
    if (typeof loadMateri === 'function') {
      setActiveMenu('materi');
      loadMateri(content);
    } else {
      showWithTransition('<div class="card">Materi tidak tersedia.</div>');
    }
  } else if (page === 'quiz') {
    if (typeof startQuiz === 'function') {
      setActiveMenu('quiz');
      startQuiz(content);
    } else {
      showWithTransition('<div class="card">Quiz tidak tersedia.</div>');
    }
  }
}

// Menu Events
menuItems.forEach(li => {
  li.addEventListener('click', () => loadPage(li.dataset.page));
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      li.click();
    }
  });
});

// Hamburger Toggle
hamburger?.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

// Click Outside to Close
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 1000) {
    if (!sidebar.contains(e.target) && !e.target.closest('.hamburger')) {
      sidebar.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }
});

// Init
initTheme();
window.addEventListener('load', () => loadPage('home'));