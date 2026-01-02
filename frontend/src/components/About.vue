<template>
  <section class="about">
    <h2>What does the application do?</h2>
    <p>
      Stats-Handball is an AI-powered platform that automatically analyzes handball match videos to extract detailed statistics. It identifies players, tracks their movements, and records key actions like goals and shots.
    </p>
    <h3>Target Audience</h3>
    <div class="audience-cards">
      <div class="card">
        <h4>Players</h4>
        <p>Review their performance and identify areas for improvement.</p>
      </div>
      <div class="card">
        <h4>Coaches</h4>
        <p>Gain insights into team strategy and player performance.</p>
      </div>
      <div class="card">
        <h4>Sports Analysts</h4>
        <p>Get detailed data for in-depth match analysis.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about {
  padding: 4rem 2rem;
  text-align: center;
  background-color: var(--color-surface, #f7f9fc);
}

.about h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary, #212529);
}

.about > p {
  font-size: 1.125rem;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-text-secondary, #495057);
}

.about h3 {
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: var(--color-text-primary, #212529);
}

.audience-cards {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  max-width: 280px;
  flex: 1;
}

.card h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-primary, #0d47a1);
}
</style>
