// handball_ai/frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const statusContainer = document.getElementById('status-container');
    const resultsContainer = document.getElementById('results-container');
    let pollingInterval;

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearInterval(pollingInterval); // Detener cualquier sondeo anterior

        const formData = new FormData(uploadForm);
        statusContainer.textContent = 'Subiendo vídeo...';
        resultsContainer.textContent = '';

        try {
            const uploadResponse = await fetch('/api/videos/upload', {
                method: 'POST',
                body: formData,
            });

            if (uploadResponse.status !== 202) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'La subida falló');
            }

            const data = await uploadResponse.json();
            const videoId = data.video_id;
            statusContainer.textContent = `Vídeo en cola para análisis (ID: ${videoId})...`;

            // Iniciar sondeo del estado
            startPolling(videoId);

        } catch (error) {
            statusContainer.textContent = `Error: ${error.message}`;
        }
    });

    function startPolling(videoId) {
        pollingInterval = setInterval(async () => {
            try {
                const statusResponse = await fetch(`/api/stats/${videoId}/status`);
                const data = await statusResponse.json();

                statusContainer.textContent = `Estado del análisis: ${data.status}`;

                if (data.status === 'completed') {
                    clearInterval(pollingInterval);
                    statusContainer.textContent = 'Análisis completado. Obteniendo resultados...';
                    fetchResults(videoId);
                } else if (data.status === 'error') {
                    clearInterval(pollingInterval);
                    statusContainer.textContent = 'Ocurrió un error durante el análisis.';
                }
                // Si el estado es 'processing' o 'queued', el sondeo continúa
            } catch (error) {
                clearInterval(pollingInterval);
                statusContainer.textContent = 'Error al consultar el estado.';
            }
        }, 3000); // Consultar cada 3 segundos
    }

    async function fetchResults(videoId) {
        try {
            const resultsResponse = await fetch(`/api/stats/${videoId}`);
            const resultsData = await resultsResponse.json();

            if (!resultsResponse.ok) {
                throw new Error(resultsData.error || 'Error al obtener los resultados.');
            }

            resultsContainer.innerHTML = `<h3>Resultados para ${resultsData.filename}</h3>
                                          <pre>${JSON.stringify(resultsData, null, 2)}</pre>`;
        } catch (error) {
            resultsContainer.textContent = `Error: ${error.message}`;
        }
    }
});
