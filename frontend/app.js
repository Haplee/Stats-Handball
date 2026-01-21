document.addEventListener('DOMContentLoaded', () => {
    const formularioSubida = document.getElementById('uploadForm');
    const inputArchivo = document.getElementById('videoFile');
    const estadoSubida = document.getElementById('uploadStatus');
    const listaVideos = document.getElementById('videoList');

    // Guardamos los vídeos aquí para no tener que pedirlos cada vez que abrimos un modal
    let todosLosVideos = [];

    // Al arrancar, pedimos los vídeos que ya existan
    pedirVideos();

    // Mostramos el nombre del archivo cuando se selecciona
    inputArchivo.addEventListener('change', () => {
        if (inputArchivo.files.length > 0) {
            estadoSubida.textContent = `Has elegido: ${inputArchivo.files[0].name}`;
            estadoSubida.style.color = 'var(--secondary)';
        }
    });

    // Cambiar entre subir archivo o pegar link de Youtube
    window.switchTab = (pestana) => {
        const zonaArchivo = document.getElementById('file-upload-zone');
        const zonaUrl = document.getElementById('url-upload-zone');
        const botonArchivo = document.getElementById('tab-file');
        const botonUrl = document.getElementById('tab-url');

        if (pestana === 'file') {
            zonaArchivo.style.display = 'block';
            zonaUrl.style.display = 'none';
            botonArchivo.classList.add('active');
            botonUrl.classList.remove('active');
        } else {
            zonaArchivo.style.display = 'none';
            zonaUrl.style.display = 'block';
            botonArchivo.classList.remove('active');
            botonUrl.classList.add('active');
        }
        estadoSubida.textContent = '';
    };

    // Lógica para procesar enlaces de Youtube
    document.getElementById('btnUrlSubmit').addEventListener('click', async () => {
        const inputUrl = document.getElementById('youtubeUrl');
        const url = inputUrl.value.trim();

        if (!url) {
            estadoSubida.textContent = 'Pega un enlace de Youtube, anda.';
            estadoSubida.style.color = 'var(--error)';
            return;
        }

        estadoSubida.textContent = 'Mandando el enlace a la IA...';
        estadoSubida.style.color = 'var(--secondary)';

        try {
            const respuesta = await fetch('/api/upload-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                estadoSubida.textContent = '¡Enlace recibido! Empezamos a bajarlo.';
                estadoSubida.style.color = 'var(--success)';
                inputUrl.value = '';
                pedirVideos();
            } else {
                estadoSubida.textContent = `Error: ${resultado.error}`;
                estadoSubida.style.color = 'var(--error)';
            }
        } catch (error) {
            estadoSubida.textContent = 'No puedo conectar con el servidor.';
        }
    });

    // SUBIDA CON BARRA DE PROGRESO REAL
    formularioSubida.addEventListener('submit', (e) => {
        e.preventDefault();

        if (inputArchivo.files.length === 0) {
            estadoSubida.textContent = 'Selecciona un archivo primero.';
            return;
        }

        const datos = new FormData();
        datos.append('file', inputArchivo.files[0]);

        estadoSubida.innerHTML = `
            <div style="width:100%; height:8px; background:#1e293b; border-radius:4px; margin:10px 0; overflow:hidden;">
                <div id="barra-fill" style="width:0%; height:100%; background:var(--primary); transition: width 0.3s;"></div>
            </div>
            <small id="barra-texto">Subiendo vídeo...</small>
        `;

        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (ev) => {
            if (ev.lengthComputable) {
                const porc = Math.round((ev.loaded / ev.total) * 100);
                document.getElementById('barra-fill').style.width = porc + '%';
                document.getElementById('barra-texto').textContent = `Subiendo: ${porc}%`;
            }
        };

        xhr.onload = () => {
            if (xhr.status === 202) {
                estadoSubida.innerHTML = '<span style="color:var(--success)">¡Listo! Análisis en marcha.</span>';
                pedirVideos();
            } else {
                estadoSubida.textContent = 'Ha fallado la subida.';
            }
        };

        xhr.open('POST', '/api/upload');
        xhr.send(datos);
    });

    // Función para pedir la lista de vídeos al servidor
    async function pedirVideos() {
        try {
            const respuesta = await fetch('/api/videos');
            todosLosVideos = await respuesta.json();
            dibujarListaVideos(todosLosVideos);
        } catch (error) {
            console.error('Error al pedir vídeos:', error);
        } finally {
            // Adaptive polling: poll faster if we have active jobs
            let nextPoll = 30000;
            if (Array.isArray(todosLosVideos) && todosLosVideos.some(v => v.status === 'procesando')) {
                nextPoll = 5000;
            }
            setTimeout(pedirVideos, nextPoll);
        }
    }

    // Dibujar las tarjetitas de los vídeos en el dashboard
    function dibujarListaVideos(videos) {
        listaVideos.innerHTML = '';

        if (videos.length === 0) {
            listaVideos.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">Aún no hay análisis. ¡Sube tu primer partido!</p>';
            return;
        }

        videos.forEach(v => {
            const esOk = v.status === 'completado';
            const esCurrando = v.status === 'procesando';

            const card = document.createElement('div');
            card.className = `video-item ${esOk ? 'clickable' : ''}`;
            if (esOk) card.onclick = () => abrirConsultoria(v.id);

            card.innerHTML = `
                <div class="video-thumb">
                    <i data-feather="${esOk ? 'check-circle' : (esCurrando ? 'loader' : 'monitor')}" 
                       class="${esCurrando ? 'spin' : ''}"
                       style="width:32px; height:32px; color:${esOk ? 'var(--success)' : 'var(--text-muted)'}"></i>
                    <span class="status-badge status-${v.status}">${v.status}</span>
                </div>
                <div class="video-info">
                    <div class="video-title" title="${v.filename}">${v.filename}</div>
                    <div class="video-meta">
                        ${esCurrando ? `Analizando... ${v.progress || 0}%` : `ID: ${v.id}`}
                    </div>
                </div>
            `;
            listaVideos.appendChild(card);
        });

        if (window.feather) feather.replace();
    }

    // ABRIR EL MODAL DE RESULTADOS
    window.abrirConsultoria = (id) => {
        const v = todosLosVideos.find(x => x.id === id);
        if (!v || !v.results) return;

        const res = v.results;
        document.getElementById('modalTitle').textContent = v.filename;
        document.getElementById('modalMeta').textContent = `Informe de rendimiento generado el ${new Date().toLocaleDateString()}`;

        // Ponemos los números grandes
        document.getElementById('statIntensity').textContent = res.summary.intensity_score;
        document.getElementById('statSpeed').textContent = res.summary.avg_speed;
        document.getElementById('statPlayers').textContent = res.summary.total_players;
        document.getElementById('statDuration').textContent = res.summary.duration;

        // Rellenamos el selector de jugadores para el filtro
        const filtro = document.getElementById('playerFilter');
        filtro.innerHTML = '<option value="all">Todos los jugadores</option>';
        res.player_stats.forEach(p => {
            filtro.innerHTML += `<option value="${p.id}">${p.name}</option>`;
        });

        // Evento para FILTRAR EL MAPA DE CALOR
        filtro.onchange = () => {
            dibujarMapaCalor(v.id, filtro.value);
        };

        // Dibujamos el mapa por defecto (todos)
        dibujarMapaCalor(v.id, 'all');

        // Ponemos la tablita de los mejores
        const listaJugadores = document.getElementById('playerStatsList');
        listaJugadores.innerHTML = res.player_stats.map(p => `
            <div style="background:var(--bg-accent); padding:0.8rem; border-radius:8px; display:flex; justify-content:space-between; border-left:3px solid var(--primary); margin-bottom:8px;">
                <span style="font-weight:600;">${p.name}</span>
                <span style="color:var(--success); font-weight:700;">${p.speed}</span>
            </div>
        `).join('');

        document.getElementById('resultsModal').style.display = 'flex';
        if (window.feather) feather.replace();

        // LÓGICA PARA EXPORTAR PDF
        document.getElementById('btnPdf').onclick = async () => {
            const { jsPDF } = window.jspdf;
            const area = document.getElementById('pdfArea');
            const canvas = await html2canvas(area, { backgroundColor: '#0f172a' });
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4');
            const anchoImg = 190;
            const altoImg = (canvas.height * anchoImg) / canvas.width;

            pdf.setTextColor(40);
            pdf.setFontSize(18);
            pdf.text('Informe Técnico: ' + v.filename, 10, 20);
            pdf.addImage(imgData, 'PNG', 10, 30, anchoImg, altoImg);
            pdf.save(`Informe_${id}.pdf`);
        };
    };

    // Función para pintar los puntitos del mapa
    function dibujarMapaCalor(idVideo, idFiltro) {
        const v = todosLosVideos.find(x => x.id === idVideo);
        const contenedor = document.getElementById('heatmapData');
        contenedor.innerHTML = '';

        let puntos = [];
        if (idFiltro === 'all') {
            puntos = v.results.heatmap_all;
        } else {
            puntos = v.results.heatmap_players[idFiltro] || [];
        }

        puntos.forEach(p => {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.left = p.x + '%';
            div.style.top = p.y + '%';
            div.style.width = '25px';
            div.style.height = '25px';
            div.style.transform = 'translate(-50%, -50%)';
            div.style.borderRadius = '50%';
            div.style.background = `radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)`;
            div.style.filter = 'blur(5px)';
            contenedor.appendChild(div);
        });
    }

    window.closeModal = () => {
        document.getElementById('resultsModal').style.display = 'none';
    };

    // El polling ya se gestiona dentro de pedirVideos de forma adaptativa
});
