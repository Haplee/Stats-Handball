<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Stats-Handball</h1>
      <p>An AI-powered app for analyzing handball matches.</p>
      <a href="https://github.com/Haplee/Stats-Handball" target="_blank" rel="noopener noreferrer" class="cta-button">
        View on GitHub
      </a>
    </div>
  </section>
</template>

<script setup>
</script>

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
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
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
  display: inline-block;
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
