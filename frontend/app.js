document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const videoFile = document.getElementById('videoFile');
    const uploadStatus = document.getElementById('uploadStatus');
    const videoList = document.getElementById('videoList');

    // Fetch and display the list of videos on page load
    fetchVideos();

    // Handle the video upload form submission
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (videoFile.files.length === 0) {
            uploadStatus.textContent = 'Por favor, selecciona un archivo de vídeo.';
            return;
        }

        const formData = new FormData();
        formData.append('file', videoFile.files[0]);

        uploadStatus.textContent = 'Subiendo vídeo...';

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                uploadStatus.textContent = `Éxito: ${result.message}`;
                // Refresh the video list after a successful upload
                fetchVideos();
            } else {
                uploadStatus.textContent = `Error: ${result.error}`;
            }
        } catch (error) {
            console.error('Error al subir el vídeo:', error);
            uploadStatus.textContent = 'Error de conexión al intentar subir el vídeo.';
        }
    });

    // Function to fetch the list of videos from the backend
    async function fetchVideos() {
        try {
            const response = await fetch('/api/videos');
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de vídeos.');
            }
            const videos = await response.json();
            renderVideoList(videos);
        } catch (error) {
            console.error('Error al obtener vídeos:', error);
            videoList.innerHTML = '<li>Error al cargar la lista de vídeos.</li>';
        }
    }

    // Function to render the video list in the UI
    function renderVideoList(videos) {
        videoList.innerHTML = ''; // Clear the current list

        if (videos.length === 0) {
            videoList.innerHTML = '<li>No hay vídeos para mostrar.</li>';
            return;
        }

        videos.forEach(video => {
            const li = document.createElement('li');

            const statusClass = `status-${video.status.toLowerCase()}`;

            li.innerHTML = `
                <span>${video.filename}</span>
                <span class="status ${statusClass}">${video.status.toUpperCase()}</span>
            `;
            videoList.appendChild(li);
        });
    }

    // Poll for video updates every 5 seconds (simple polling example)
    // setInterval(fetchVideos, 5000);
});
