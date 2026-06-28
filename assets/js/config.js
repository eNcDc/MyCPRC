// Centralised API base URL.
// Local dev  → http://localhost:3000
// Production → replaced by deploy.sh with the real API Gateway URL
const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://fjp126vye4.execute-api.ap-southeast-1.amazonaws.com';

// Intercept any <form data-api-submit="true"> and POST it via fetch instead
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-api-submit]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const res  = await fetch(`${API}/submit`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        alert(json.success ? '✅ Data berjaya dihantar!' : '❌ ' + json.message);
        if (json.success) form.reset();
      } catch { alert('❌ Gagal menghubungi pelayan.'); }
    });
  });
});
