const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const resourceMap = {
  'resource-phishing': {
    title: 'Phishing Awareness Guide',
    body: '<p>Phishing attempts often arrive as urgent requests, unexpected attachments, or links that appear trustworthy.</p><p>Verify the sender, inspect the domain carefully, and use a trusted communication channel before taking action. If a request seems unusual, pause and confirm it through a known process.</p>'
  },
  'resource-password': {
    title: 'Password Security Guide',
    body: '<p>Use long, unique passwords for each business system and avoid reusing personal or work credentials across services.</p><p>When multi-factor authentication is available, enable it and keep recovery options current. Store passwords in an approved password manager and never share them in email or chat.</p>'
  },
  'resource-data': {
    title: 'Data Handling Guide',
    body: '<p>Classify information by sensitivity and handle it according to the intended business purpose. Only share what is necessary for the task.</p><p>Do not store customer, employee, or confidential company information in personal tools or unmanaged folders. Use approved platforms and follow the organization\'s retention rules.</p>'
  },
  'resource-remote': {
    title: 'Remote Working Guide',
    body: '<p>When working remotely, use company-approved devices, secure networks, and trusted access methods for business systems.</p><p>Keep screens protected from view, lock devices when away, and confirm that shared spaces do not expose sensitive information. Report unusual access or device loss promptly.</p>'
  },
  'resource-incident': {
    title: 'Incident Reporting Guide',
    body: '<p>Report suspicious messages, lost devices, unexpected login activity, or possible data exposure through the approved reporting process.</p><p>Time matters. A quick report allows the organization to contain risk, review the situation, and take protective actions as needed.</p>'
  },
  'resource-privacy': {
    title: 'Privacy',
    body: '<p>Example Corporation values careful handling of personal and business information. Information should be used only for approved business purposes and protected according to policy.</p>'
  },
  'resource-responsible': {
    title: 'Responsible Use',
    body: '<p>Responsible use means working only with approved applications, handling information carefully, and avoiding actions that could expose people, systems, or data to unnecessary risk.</p>'
  },
  'resource-security': {
    title: 'Security',
    body: '<p>Security depends on everyday habits: verifying requests, protecting credentials, reporting concerns, and keeping systems and devices current.</p>'
  },
  'contact-demo': {
    title: 'Demo environment',
    body: '<p>Contact information is intentionally not configured in this demonstration environment.</p><p>Use your organization\'s approved support or incident-reporting channel for real inquiries.</p>'
  }
};

let lastFocusedElement = null;

function openModal(key) {
  const content = resourceMap[key];
  if (!content) return;

  lastFocusedElement = document.activeElement;
  modalTitle.textContent = content.title;
  modalBody.innerHTML = content.body;
  modalBackdrop.classList.add('is-visible');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}

function closeModal() {
  modalBackdrop.classList.remove('is-visible');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteNav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const navObserver = () => {
  const scrollPosition = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const current = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${current}"]`);
    if (!link) return;
    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((item) => item.classList.toggle('active', item === link));
    }
  });
};
window.addEventListener('scroll', navObserver, { passive: true });

const modalButtons = document.querySelectorAll('[data-modal]');
modalButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.getAttribute('data-modal')));
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalBackdrop.classList.contains('is-visible')) {
    closeModal();
  }
});

const quizForm = document.getElementById('quiz-form');
const quizResult = document.getElementById('quiz-result');

if (quizForm) {
  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const answers = ['correct', 'correct', 'correct'];
    let score = 0;

    answers.forEach((answer, index) => {
      const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
      if (selected && selected.value === answer) {
        score += 1;
      }
    });

    quizResult.textContent = `${score} of 3 correct · Review answers`;
  });
}
