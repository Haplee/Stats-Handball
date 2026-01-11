## 2024-08-05 - Managing Body Scroll for Overlays

**Learning:** For modal-like UI elements such as a full-screen mobile navigation menu, it's crucial for accessibility and usability to prevent the underlying page content from scrolling. A robust pattern in this React codebase is to use a `useEffect` hook that toggles `document.body.style.overflow = 'hidden'` based on the component's open/closed state.

**Action:** When implementing any future overlay, modal, or drawer component, I will apply this same `useEffect` pattern. I must also remember to include a cleanup function in the hook to reset `document.body.style.overflow` when the component unmounts, preventing the page from getting stuck in a non-scrollable state.
