const viewer = document.querySelector('dialog');
const photo = document.getElementById('lightbox-image');
const caption = document.getElementById('lightbox-caption');

if (viewer && typeof viewer.showModal === 'function') {
  for (const link of document.querySelectorAll('a.zoom')) {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const preview = link.querySelector('img');
      photo.src = link.href;
      photo.alt = preview?.alt || link.dataset.caption || link.textContent.trim();
      caption.textContent = link.dataset.caption || photo.alt;
      viewer.showModal();
    });
  }

  viewer.querySelector('.close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    if (event.target !== viewer) return;
    const box = viewer.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) {
      viewer.close();
    }
  });
  viewer.addEventListener('close', () => {
    photo.removeAttribute('src');
    photo.alt = '';
    caption.textContent = '';
  });
}
