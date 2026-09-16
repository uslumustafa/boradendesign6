const video = document.querySelector('#people');
const toggle = document.querySelector('.playback');
const label = toggle.querySelector('.playback-label');
const symbol = toggle.querySelector('.playback-symbol');
const progress = document.querySelector('.film-progress span');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
let explicitPlay = false;
let visible = false;
let covered = false;
function syncControl() {
  const playing = !video.paused;
  const text = video.ended ? 'Yeniden izle' : playing ? 'Filmi durdur' : 'Filmi oynat';
  toggle.setAttribute('aria-label', text);
  toggle.setAttribute('aria-pressed', String(playing));
  label.textContent = text;
  symbol.textContent = playing ? 'Ⅱ' : '▶';
}
async function updatePlayback() {
  if (video.ended) { syncControl(); return; }
  const restricted = reduced.matches || navigator.connection?.saveData;
  if (!visible || covered || document.hidden || userPaused || (restricted && !explicitPlay)) {
    video.pause();
    return;
  }
  try { video.muted = true; await video.play(); }
  catch { syncControl(); }
}
toggle.addEventListener('click', () => {
  if (video.ended) { video.currentTime = 0; userPaused = false; explicitPlay = true; updatePlayback(); return; }
  userPaused = !video.paused;
  explicitPlay = !userPaused;
  updatePlayback();
});
video.addEventListener('play', syncControl);
video.addEventListener('pause', syncControl);
video.addEventListener('ended', syncControl);
video.addEventListener('error', () => {
  toggle.disabled = true;
  label.textContent = 'Film yüklenemedi';
  toggle.setAttribute('aria-label', 'Film yüklenemedi');
});
video.addEventListener('timeupdate', () => {
  progress.style.transform = `scaleX(${Number.isFinite(video.duration) ? video.currentTime / video.duration : 0})`;
});
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  updatePlayback();
}, {threshold: 0.15}).observe(video);
document.addEventListener('visibilitychange', updatePlayback);
reduced.addEventListener('change', () => { explicitPlay = false; updatePlayback(); });
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.mobile-menu').open = false;
}));

document.addEventListener('boraden:film-visibility', event => {
  covered = event.detail.covered;
  updatePlayback();
});
