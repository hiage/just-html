
const form = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const status = document.getElementById('inline-status');
const toggle = document.querySelector('.toggle-password');

function setStatus(message, type) {
  status.textContent = message;
  status.classList.remove('is-error', 'is-success');
  if (type) status.classList.add(type === 'error' ? 'is-error' : 'is-success');
}

if (toggle) {
  toggle.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Hide' : 'Show';
    toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    password.focus();
  });
}

document.querySelectorAll('[data-help]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setStatus('Password recovery is not available in this demonstration environment.', 'info');
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (username.value.trim() === 'demo' && password.value === 'demo') {
    form.reset();
    setStatus('Sign-in successful. Corporate payment operations access is active.', 'success');
  } else {
    password.value = '';
    setStatus('The User ID or password is incorrect.', 'error');
    password.focus();
  }
});
