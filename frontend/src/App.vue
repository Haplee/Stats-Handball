<script setup>
import { RouterView } from 'vue-router'
import PageFooter from '@/components/PageFooter.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <a href="/dashboard/index.html">Project Dashboard</a>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <PageFooter />
</template>

<style scoped>
header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

nav {
  display: flex;
  justify-content: flex-end;
}

nav a {
  color: var(--color-primary, #0d47a1);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

nav a:hover {
  background-color: var(--color-surface, #f7f9fc);
}
</style>
