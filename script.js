// =========================
// Projekt-popup (galleri.html)
// =========================

function openProject(dialog) {
  dialog.showModal();
  dialog.querySelector('.popup').scrollTop = 0;
  dialog.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
  history.replaceState(null, '', '#' + dialog.id);
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openProject(document.getElementById(btn.dataset.open)));
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });  // klick utanför
  dialog.addEventListener('close', () => {                                              // Esc, kryss, utanför
    dialog.querySelectorAll('video').forEach(v => v.pause());
    history.replaceState(null, '', location.pathname + location.search);
  });
});

// galleri.html#trapp öppnar projektet direkt
const linked = document.getElementById(location.hash.slice(1));
if (linked && linked.matches('dialog')) openProject(linked);


// =========================
// About-sidan: logga + knapp till toppen
// =========================
const corner = document.querySelector('.corner-image');
const toTop  = document.querySelector('.to-top');

if (corner || toTop) {
  const onScroll = () => {
    if (corner) corner.classList.toggle('visible', window.scrollY > 140);
    if (toTop)  toTop.hidden = window.scrollY < 500;
  };
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
