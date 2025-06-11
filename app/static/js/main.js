document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // ✅ REGISTER FORM HANDLER (using FormData)
  if (registerForm) {
    const registerMsg = document.getElementById('registerMsg');

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(registerForm);

      try {
        const res = await fetch('/register', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        registerMsg.innerHTML = res.ok
          ? `<span class="text-success">${data.message}</span>`
          : `<span class="text-danger">${data.error || 'Registration failed.'}</span>`;

        if (res.ok) {
          registerForm.reset();
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
      } catch (err) {
        registerMsg.innerHTML = `<span class="text-danger">Network error occurred</span>`;
      }
    });
  }

  // ✅ LOGIN FORM HANDLER
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const msgBox = document.getElementById('loginMsg');

      try {
        const res = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        msgBox.innerText = data.msg || 'Login successful';
        msgBox.style.color = res.ok ? 'green' : 'red';

        if (res.ok) {
          localStorage.setItem('token', data.token);
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        }
      } catch (err) {
        msgBox.innerText = 'Login failed: network error';
        msgBox.style.color = 'red';
      }
    });
  }
});