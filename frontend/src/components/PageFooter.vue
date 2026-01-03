<template>
  <footer class="site-footer">
    <div class="footer-content">
      <p>
        <a
          href="https://github.com/Haplee/Stats-Handball"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </p>
      <p>Developed by Haplee</p>
      <p>&copy; 2024 Stats-Handball. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.site-footer {
  background-color: #2c3e50; /* Darker, more modern blue-gray */
  color: white;
  padding: 3rem 1rem;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  margin: 0.5rem 0;
  color: #bdc3c7; /* Lighter text color */
}

.footer-content a {
  color: #ecf0f1; /* Even lighter color for the link */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-content a:hover {
  color: var(--color-accent, #ff6d00);
}
</style>
