// Simple page transition: fade out before navigating.
(function () {
  // Remove the enter class once page loads (fade in).
  window.addEventListener("load", () => {
    document.body.classList.remove("page-enter");
  });

  // Intercept internal link clicks to animate out.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href) return;

    // Don't intercept:
    // - external links
    // - mailto/tel
    // - hash-only jumps within the same page
    const isExternal = a.host && a.host !== window.location.host;
    const isSpecial = href.startsWith("mailto:") || href.startsWith("tel:");
    const isHashOnly = href.startsWith("#");

    if (isExternal || isSpecial || isHashOnly) return;

    // Allow ctrl/cmd click open new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    document.body.classList.add("page-exit");

    // Navigate after animation
    setTimeout(() => {
      window.location.href = href;
    }, 220);
  });
})();
