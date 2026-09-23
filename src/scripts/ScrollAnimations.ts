/**
 * Shared scroll-triggered animations.
 *
 * Usage:
 *   Add `class="fade-up"` or `class="scale-up"` to any element.
 *   The corresponding CSS handles the initial hidden state and the `.show` transition.
 *
 * For staggered groups (animates each children with 200ms offset):
 *   Wrap children in a parent with `data-stagger-group` and give each child
 *   `class="fade-up"` or `class="scale-up"`.
 */

function initScrollAnimations() {
  // ── Standalone elements (not inside a stagger group or custom observer) ─
  const standalone = document.querySelectorAll<HTMLElement>(
    [
      ".fade-up:not([data-stagger-group] *):not([data-custom-observer] *)",
      ".scale-up:not([data-stagger-group] *):not([data-custom-observer] *)",
      ".reveal:not([data-stagger-group] *):not([data-custom-observer] *)",
    ].join(", "),
  );

  const standaloneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          standaloneObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  standalone.forEach((el) => standaloneObserver.observe(el));

  // ── Staggered groups ──────────────────────────────────────────────────
  const groups = document.querySelectorAll<HTMLElement>("[data-stagger-group]");

  const groupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll<HTMLElement>(
            ".fade-up, .scale-up, .reveal",
          );
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("show");
            }, index * 200);
          });
          groupObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  groups.forEach((group) => groupObserver.observe(group));
}

initScrollAnimations();
