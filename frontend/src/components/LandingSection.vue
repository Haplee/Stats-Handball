<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Stats-Handball</h1>
      <p>An AI-powered app for analyzing handball matches.</p>
      <a
        href="https://github.com/Haplee/Stats-Handball"
        target="_blank"
        rel="noopener noreferrer"
        class="cta-button"
        aria-label="View on GitHub (opens in a new tab)"
      >
        View on GitHub
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-external-link"
          style="margin-left: 0.5rem; vertical-align: text-bottom"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem;
  background-color: #f0f4f8; /* Light gray background */
  background-image: url('https://storage.googleapis.com/agent-tools-dev-external-testing-public-read/handball-hero.jpg'); /* Placeholder image */
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.hero-content h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-accent, #ff6d00);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #e65c00;
}
</style>
