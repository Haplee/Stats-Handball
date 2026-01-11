## 2024-08-05 - Correctly Code-Splitting Client-Side Dependencies

**Learning:** When optimizing a Next.js App Router application, a heavy, client-side-only dependency (like a particle animation library) should be code-split using `next/dynamic`. However, simply using `dynamic(() => import(...), { ssr: false })` in a Server Component will cause a build failure. The correct and most performant pattern is to isolate the dynamic import to the lowest possible Client Component in the tree. This allows critical UI to be server-rendered for a fast LCP, while the non-essential, heavy component is loaded asynchronously on the client.

**Action:** For future performance optimizations involving client-side-only libraries, I will identify the specific component that uses the library and dynamically import it *within its parent component*, which must be a Client Component (`"use client"`). I will avoid disabling SSR on high-level page components or critical UI elements.
