// assets/theme-editor.js (refined but equivalent)

const hideProductModals = () => {
  document.querySelectorAll('product-modal[open]')?.forEach(m => m.hide());
};

document.addEventListener('shopify:block:select', (event) => {
  hideProductModals();

  const slide = event.target;
  if (!slide.classList.contains('slideshow__slide')) return;

  const slideshow = slide.closest('slideshow-component');
  if (!slideshow) return;

  slideshow.pause?.();
  // Scroll to the selected slide after the editor focuses it
  setTimeout(() => {
    slideshow.slider?.scrollTo({ left: slide.offsetLeft });
  }, 200);
});

document.addEventListener('shopify:block:deselect', (event) => {
  const slide = event.target;
  if (!slide.classList.contains('slideshow__slide')) return;

  const slideshow = slide.closest('slideshow-component');
  if (slideshow?.autoplayButtonIsSetToPlay) slideshow.play?.();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModals();
  // Re-run zoom-on-hover script if present
  const zoomScript = document.querySelector('[id^="EnableZoomOnHover"]');
  if (zoomScript) zoomScript.replaceWith(zoomScript.cloneNode(true));
});

document.addEventListener('shopify:section:unload', (event) => {
  const id = event?.detail?.sectionId;
  if (!id) return;

  document.querySelectorAll(`[data-section="${id}"]`).forEach(el => el.remove());
  document.body.classList.remove('overflow-hidden');
});

// Keep the rest as simple no-ops that just close modals
[
  'shopify:section:reorder',
  'shopify:section:select',
  'shopify:section:deselect',
  'shopify:inspector:activate',
  'shopify:inspector:deactivate'
].forEach(evt => document.addEventListener(evt, hideProductModals));
