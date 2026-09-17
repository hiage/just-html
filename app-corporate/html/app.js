
const form = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const toggle = document.querySelector('.toggle-password');
const inlineStatus = document.getElementById('inline-status');

function setStatus(message, type = 'info') {
  if (!inlineStatus) return;
  inlineStatus.textContent = message;
  inlineStatus.className = `inline-status ${type}`;
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

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const userName = username.value.trim();

    if (userName.toLowerCase() === 'demo' && password.value === 'demo') {
      form.reset();
      setStatus('Sign-in successful. Your corporate services access is ready.', 'success');
    } else {
      password.value = '';
      setStatus('The User ID or password is incorrect.', 'error');
      password.focus();
    }
  });
}
