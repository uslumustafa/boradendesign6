const video = document.querySelector('#people');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
let explicitPlay = false;
let visible = false;
let covered = false;
function syncControl() {
  const playing = !video.paused;
  const text = video.ended ? 'Yeniden izle' : playing ? 'Filmi durdur' : 'Filmi oynat';
  video.setAttribute('aria-label', 'Sessiz Boraden filmi. ' + text + ' — tıklayın veya Enter / boşluk tuşunu kullanın.');
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
function togglePlayback() {
  if (video.ended) { video.currentTime = 0; userPaused = false; explicitPlay = true; updatePlayback(); return; }
  userPaused = !video.paused;
  explicitPlay = !userPaused;
  updatePlayback();
}
video.addEventListener('click', togglePlayback);
video.addEventListener('keydown', event => {
  if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); togglePlayback(); }
});
video.addEventListener('play', syncControl);
video.addEventListener('pause', syncControl);
video.addEventListener('ended', syncControl);
video.addEventListener('error', () => video.setAttribute('aria-label', 'Film yüklenemedi'));
syncControl();
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
