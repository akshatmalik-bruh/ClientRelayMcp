import { useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to all elements matching the given selector.
 * Adds the `is-visible` class when they enter the viewport.
 */
export const useScrollReveal = (selector: string = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale', threshold = 0.12) => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Remove class when out of view to allow re-triggering
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold]);
};
