
import { getSessions, getReserves, cancelReserva, toggleAssistencia, importSessionsFromJson } from './storage.js';
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
    render();
  } catch (e) {
    alert('Error en la importacion: ' + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Importar sesiones (JSON)';
  }
}

function renderReserves() {
  const reserves = getReserves();
  const sessions = getSessions();
  const container = document.getElementById('reserves-list');
  container.innerHTML = '';

  if (!reserves.length) {
    container.innerHTML = '<p class="empty-msg">No hay reserves activas.</p>';
    return;
  }

  reserves.forEach(r => {
    const sessio = sessions.find(s => s.id === r.sessioId);
    const nomSessio = sessio
      ? `${sessio.activitat} – ${sessio.dia} ${sessio.hora}`
      : 'Sesion eliminada';

    const item = document.createElement('div');
    item.className = `reserva-item ${r.assistida ? 'assistida' : ''}`;
    item.innerHTML = `
      <div class="reserva-info">
        <strong>${r.nomSoci}</strong>
        <span>${nomSessio}</span>
        <span class="reserva-id">${r.id}</span>
      </div>
      <div class="reserva-accions">
        <button class="btn btn--sm btn--outline toggle-btn" data-id="${r.id}">
          ${r.assistida ? 'Assistida' : 'No presente'}
        </button>
        <button class="btn btn--sm btn--danger cancel-btn" data-id="${r.id}">
          Eliminar
        </button>
      </div>
    `;
    container.appendChild(item);
  });

  document.querySelectorAll('.cancel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Quieres eliminar esta reserva?')) {
        cancelReserva(btn.dataset.id);
        render();
      }
    });
  });
}

document.getElementById('import-btn').addEventListener('click', importarSessions);

function render() {
  renderSessions();
  renderReserves();
}

render();