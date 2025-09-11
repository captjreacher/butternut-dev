document.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('.bn-sticky-atc');
  if (!bar) return;

  const mainBtn = document.querySelector('product-form [type="submit"], form[action*="/cart/add"] [type="submit"]');
  const priceEl = document.querySelector('[data-product-price],[data-price]');
  const stickyBtn = document.getElementById('bn-sticky-btn-' + bar.id.split('-').pop());

  const showIfOutOfView = () => {
    if (!mainBtn) return;
    const r = mainBtn.getBoundingClientRect();
    const inView = r.top >= 0 && r.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    bar.toggleAttribute('hidden', inView);
    bar.classList.toggle('is-visible', !inView);
  };

  showIfOutOfView();
  document.addEventListener('scroll', showIfOutOfView, { passive:true });
  window.addEventListener('resize', showIfOutOfView);

  // keep price in sync if variant changes
  const updatePrice = () => { if (priceEl) bar.querySelector('.bn-price').textContent = priceEl.textContent.trim(); };
  document.addEventListener('variant:change', updatePrice);
  setTimeout(updatePrice, 300);

  if (stickyBtn && mainBtn){
    stickyBtn.addEventListener('click', e => { e.preventDefault(); mainBtn.click(); });
  }
});
