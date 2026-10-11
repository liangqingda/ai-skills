---
title: Use defer or async on Script Tags
impact: HIGH
impactDescription: eliminates render-blocking
tags: rendering, script, defer, async, performance
---

## Use defer or async on Script Tags

**Impact: HIGH (eliminates render-blocking)**

Script tags without `defer` or `async` block HTML parsing while the script downloads and executes. This delays First Contentful Paint and Time to Interactive.

- **`defer`**: Downloads in parallel, executes after HTML parsing completes, maintains execution order
- **`async`**: Downloads in parallel, executes immediately when ready, no guaranteed order

Use `defer` for scripts that depend on DOM or other scripts. Use `async` for independent scripts like analytics.

**Incorrect (blocks rendering):**

```html
<!-- index.html -->
<script src="https://example.com/analytics.js"></script>
<script src="/scripts/utils.js"></script>
```

**Correct (non-blocking):**

```html
<!-- Independent script - use async -->
<script src="https://example.com/analytics.js" async></script>
<!-- DOM-dependent script - use defer -->
<script src="/scripts/utils.js" defer></script>
```

**Note:** In a Vite app, third-party scripts that belong in the HTML shell live in `index.html`; defer/async there is the direct fix. Scripts added dynamically from React code can use plain `document.createElement('script')` or a loader like `@vercel/analytics`. Build-time modules don't need this — bundlers already emit optimized `<script type="module">` tags.

Reference: [MDN - Script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer)
