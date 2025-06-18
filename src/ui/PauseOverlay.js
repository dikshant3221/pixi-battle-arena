export function setupPauseUI(app) {
  const overlay = document.createElement('div');
  overlay.id = 'pauseOverlay';
  overlay.innerHTML = `
    <div class="pause-box">
      <h1>Paused</h1>
      <button onclick="window.location.reload()">Restart</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.style.display = 'none';

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const visible = overlay.style.display === 'block';
      overlay.style.display = visible ? 'none' : 'block';
      app.app.ticker.started = visible; // pause/unpause
    }
  });
}
