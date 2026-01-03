<template>
  <section class="technologies">
    <h2>Technologies Used</h2>
    <div class="tech-grid">
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>Python</span>
      </div>
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>Flask</span>
      </div>
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>SQLAlchemy</span>
      </div>
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>Vue.js</span>
      </div>
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>Chart.js</span>
      </div>
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>PyTorch</span>
      </div>
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>YOLOv8</span>
      </div>
      <div class="tech-item">
        <div class="tech-icon">[Icon]</div>
        <span>OpenCV</span>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.technologies {
  padding: 4rem 2rem;
  text-align: center;
  background-color: var(--color-surface, #f7f9fc);
}

.technologies h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.tech-icon {
  font-size: 3rem; /* Placeholder for icon */
  color: var(--color-primary, #0d47a1);
}

.tech-item span {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-secondary, #495057);
}
</style>
