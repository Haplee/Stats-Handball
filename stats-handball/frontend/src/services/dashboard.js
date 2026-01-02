document.addEventListener('DOMContentLoaded', () => {
    fetch('../public/data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('status').textContent = data.status;

            const featuresList = document.getElementById('features');
            data.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });

            const commitsList = document.getElementById('commits');
            data.commits.forEach(commit => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${commit.message}</strong> - <em>${commit.author}</em> (${commit.date})`;
                commitsList.appendChild(li);
            });

            const roadmapList = document.getElementById('roadmap');
            data.roadmap.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                roadmapList.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar los datos del dashboard:', error));
});