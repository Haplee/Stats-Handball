async function loadStats() {
  try {
    const response = await fetch("/api/stats");
    const data = await response.json();

    const ctx = document.getElementById('stats-chart');
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  } catch (error) {
    console.error("Error loading stats:", error);
  }
}

loadStats();
