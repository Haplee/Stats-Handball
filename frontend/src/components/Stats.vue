<template>
  <section class="stats">
    <h2>Statistics Visualization</h2>
    <div class="chart-container">
      <canvas id="stats-chart"></canvas>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

onMounted(() => {
  // Prevent chart rendering during tests
  if (import.meta.env.VITEST) {
    return;
  }

  const ctx = document.getElementById('stats-chart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Goals', 'Matches', 'Performance', 'Comparison A', 'Comparison B'],
      datasets: [{
        label: 'Sample Stats',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      }
    }
  });
});
</script>

<style scoped>
.stats {
  padding: 4rem 2rem;
  text-align: center;
}

.stats h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.chart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
</style>
