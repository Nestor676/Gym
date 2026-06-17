
import { getSessions, getReserves, importSessionsFromJson } from './storage.js';
import { crearBarraOcupacio } from './ocupacio.js';

function renderSessions() {
  const sessions = getSessions();
  const reserves = getReserves();
  const container = document.getElementById('sessions-list');
  container.innerHTML = '';

  if (!sessions.length) {
    container.innerHTML = '<p class="empty-msg">Crea una sesion. O importa del JSON.</p>';
    return;
  }

  sessions.forEach(s => {
    const reservesSessio = reserves.filter(r => r.sessioId === s.id);
    const card = document.createElement('div');
    card.className = 'session-card';

    card.innerHTML = `
      <div class="session-header">
        <span class="session-activitat">${s.activitat}</span>
        <span class="session-badge">${s.dia} · ${s.hora}</span>
      </div>
      <div class="session-meta">
        <span>👤 ${s.monitor}</span>
      </div>
    `;

    card.appendChild(crearBarraOcupacio(s.id, s.aforament));
    container.appendChild(card);
  });
}

async function importarSessions() {
  const btn = document.getElementById('import-btn');
  btn.disabled = true;
  btn.textContent = 'Cargando...';
  try {
    const n1 = await importSessionsFromJson('./datos/sessions_001.json');
    const n2 = await importSessionsFromJson('./datos/sessions_002.json');
    const total = n1 + n2;
    alert(total > 0 ? `Se han importado ${total} sesiones nuevas.` : 'No hay sesiones nuevas.');
    renderSessions();
  } catch (e) {
    alert('Error en la importacion: ' + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Importar sesiones (JSON)';
  }
}

document.getElementById('import-btn').addEventListener('click', importarSessions);

renderSessions();