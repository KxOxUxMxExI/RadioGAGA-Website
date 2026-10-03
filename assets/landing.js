(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const sections = document.querySelectorAll('[data-reveal]');
  let observer;
  const revealAll = () => {
    document.body.classList.remove('lp-reveal-enabled');
    if (observer) observer.disconnect();
  };
  try {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0, rootMargin: '0px 0px 40px 0px' });
    sections.forEach(section => observer.observe(section));
    document.body.classList.add('lp-reveal-enabled');
    // Keyboard navigation must reveal a section before moving focus into it.
    document.addEventListener('focusin', event => {
      const section = event.target.closest('[data-reveal]');
      if (section) section.classList.add('is-visible');
    });
    motion.addEventListener('change', revealAll);
  } catch (_) {
    revealAll();
  }
})();
