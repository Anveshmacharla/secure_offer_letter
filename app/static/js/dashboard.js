document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  const res = await fetch('/api/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  const info = document.getElementById('userInfo');

  if (res.ok) {
    info.innerText = `Hello ${data.msg} (Email: ${data.email})`;
  } else {
    info.innerText = data.msg || 'Error fetching dashboard';
    localStorage.removeItem('token');
    setTimeout(() => window.location.href = '/login', 1500);
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}