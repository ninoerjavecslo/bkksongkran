// Events slider functionality
// Handles touch swipe and button navigation for the events carousel

const slider = document.getElementById('events-slider');
const sliderWrap = document.getElementById('events-slider-wrap');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');

if (slider && sliderWrap && prevBtn && nextBtn) {
  let scrollPos = 0;
  let touchStart = 0;
  let touchEnd = 0;

  const CARD_WIDTH = 320; // matches flex-shrink-0 width
  const GAP = 20; // matches gap-5 (5 * 4px)
  const SCROLL_AMOUNT = CARD_WIDTH + GAP;

  // Get max scroll distance
  function getMaxScroll() {
    return Math.max(0, slider.scrollWidth - sliderWrap.clientWidth);
  }

  // Update button states
  function updateButtons() {
    prevBtn.disabled = scrollPos <= 0;
    nextBtn.disabled = scrollPos >= getMaxScroll();
    prevBtn.style.opacity = scrollPos <= 0 ? '0.5' : '1';
    nextBtn.style.opacity = scrollPos >= getMaxScroll() ? '0.5' : '1';
  }

  // Scroll to position
  function scrollTo(pos: number) {
    scrollPos = Math.max(0, Math.min(pos, getMaxScroll()));
    slider.style.transform = `translateX(-${scrollPos}px)`;
    updateButtons();
  }

  // Button handlers
  prevBtn.addEventListener('click', () => scrollTo(scrollPos - SCROLL_AMOUNT));
  nextBtn.addEventListener('click', () => scrollTo(scrollPos + SCROLL_AMOUNT));

  // Touch handlers
  slider.addEventListener(
    'touchstart',
    (e) => {
      touchStart = e.changedTouches[0].clientX;
    },
    { passive: true }
  );

  slider.addEventListener(
    'touchend',
    (e) => {
      touchEnd = e.changedTouches[0].clientX;
      const diff = touchStart - touchEnd;

      // Swipe right (next)
      if (diff > 50) scrollTo(scrollPos + SCROLL_AMOUNT);
      // Swipe left (prev)
      if (diff < -50) scrollTo(scrollPos - SCROLL_AMOUNT);
    },
    { passive: true }
  );

  // Initialize
  updateButtons();

  // Recalculate on resize
  window.addEventListener('resize', () => {
    scrollTo(scrollPos); // Adjust if needed
    updateButtons();
  });
}
