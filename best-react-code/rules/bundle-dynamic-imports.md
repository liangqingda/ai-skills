---
title: Dynamic Imports for Heavy Components
impact: CRITICAL
impactDescription: directly affects TTI and LCP
tags: bundle, dynamic-import, code-splitting, react-lazy, vite
---

## Dynamic Imports for Heavy Components

Use `React.lazy()` + `<Suspense>` (or a plain dynamic `import()`) to lazy-load large components not needed on initial render. In Vite/Rollup this creates separate chunks loaded on demand.

**Incorrect (Monaco bundles with main chunk ~300KB):**

```tsx
import { MonacoEditor } from './monaco-editor'

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

**Correct (Monaco loads on demand):**

```tsx
import { Suspense, lazy } from 'react'

const MonacoEditor = lazy(() =>
  import('./monaco-editor').then(m => m.MonacoEditor)
)

function CodePanel({ code }: { code: string }) {
  return (
    <Suspense fallback={<div>Loading editor…</div>}>
      <MonacoEditor value={code} />
    </Suspense>
  )
}
```

In a client-rendered app `lazy()` never needs an `ssr: false` option — everything is client-side. For route-level splitting, wrap each route component in `lazy()` (or use a router's built-in lazy support).
