// Loaded only on the home page, before paint. Without JS the site opens directly.
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'boraden-puzzle-intro-seen';
  let seen = false;
  try { seen = sessionStorage.getItem(key) === '1'; } catch {}
  if (reduced.matches || (seen && new URLSearchParams(location.search).get('intro') !== '1')) return;

  let overlay, skip, timer, done = false;
  let siblings = [];
  function finish(immediate = false) {
    if (done) return;
    done = true;
    clearTimeout(timer);
    clearTimeout(failsafe);
    try { sessionStorage.setItem(key, '1'); } catch {}
    root.classList.add('intro-leaving');
    if (immediate) root.classList.add('intro-fast');
    const cleanup = () => {
      const hadFocus = overlay?.contains(document.activeElement);
      siblings.forEach(([element, inert]) => { element.inert = inert; });
      root.classList.remove('intro-active', 'intro-running', 'intro-leaving', 'intro-fast');
      overlay?.remove();
      document.removeEventListener('keydown', onKey);
      reduced.removeEventListener('change', onPreference);
      if (hadFocus) {
        const main = document.getElementById('main');
        main?.setAttribute('tabindex', '-1');
        main?.focus({preventScroll: true});
      }
    };
    setTimeout(cleanup, immediate ? 100 : 650);
  }
  const onKey = event => { if (event.key === 'Escape') finish(true); };
  const onPreference = () => { if (reduced.matches) finish(true); };
  // Bounds the gate even if another page script fails before initialization.
  const failsafe = setTimeout(() => finish(true), 5500);
  root.classList.add('intro-active');
  document.addEventListener('DOMContentLoaded', () => {
    if (done) return;
    overlay = document.getElementById('brand-intro');
    skip = document.getElementById('intro-skip');
    if (!overlay || !skip) return finish(true);
    siblings = [...document.body.children].filter(el => el !== overlay).map(el => [el, el.inert]);
    siblings.forEach(([el]) => { el.inert = true; });
    skip.addEventListener('click', () => finish(true));
    document.addEventListener('keydown', onKey);
    reduced.addEventListener('change', onPreference);
    root.classList.add('intro-running');
    overlay.setAttribute('tabindex', '-1');
    overlay.focus({preventScroll: true});
    timer = setTimeout(() => finish(), 3400);
  }, {once: true});
})();
