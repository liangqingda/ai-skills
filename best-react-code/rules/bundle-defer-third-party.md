---
title: Defer Non-Critical Third-Party Libraries
impact: MEDIUM
impactDescription: loads after initial render
tags: bundle, third-party, analytics, defer
---

## Defer Non-Critical Third-Party Libraries

Analytics, logging, and error tracking don't block user interaction. Load them after the initial render so they don't compete with the critical path.

**Incorrect (blocks initial bundle):**

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <>
      <MainContent />
      <Analytics />
    </>
  )
}
```

**Correct (loads after initial render):**

```tsx
import { Suspense, lazy } from 'react'

const Analytics = lazy(() =>
  import('@vercel/analytics/react').then(m => m.Analytics)
)

export default function App() {
  return (
    <>
      <MainContent />
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </>
  )
}
```

Alternatively, load it imperatively after mount or on `requestIdleCallback` if you don't need it in the tree at all.
