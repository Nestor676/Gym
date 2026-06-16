
import { getSessions, addSessio, deleteSessio } from './storage.js';
import { Sessio } from './models.js';

function generateSessioId() {

  const sessions = getSessions();

  const nums = sessions.map(s => parseInt(s.id.replace('s-', ''), 10)).filter(n => !isNaN(n));

  const next = nums.length ? Math.max(...nums) + 1 : 1;

  return `s-${String(next).padStart(3, '0')}`;
}

function renderSessions() {
  const sessions = getSessions();
  const tbody = document.getElementById('sessions-tbody');
  tbody.innerHTML = '';

  if (!sessions.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-msg">Crea alguna sesion.</td></tr>';
    return;
  }

  sessions.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.activitat}</td>
      <td>${s.dia}</td>
      <td>${s.hora}</td>
      <td>${s.monitor}</td>
      <td>${s.aforament}</td>
      <td>
        <button class="btn btn--sm btn--danger del-btn" data-id="${s.id}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm(`Eliminar sessió ${btn.dataset.id}? Això també eliminarà les seves reserves.`)) {
        deleteSessio(btn.dataset.id);
        renderSessions();
      }
    });
  });
}

function handleAdd(e) {
  e.preventDefault();
  const get = id => document.getElementById(id).value.trim();
  const missatge = document.getElementById('sessio-missatge');
  missatge.textContent = '';

  const activitat = get('act-actividad');
  const dia = get('act-dia');
  const hora = get('act-hora');
  const monitor = get('act-monitor');
  const aforament = parseInt(get('act-aforo'), 10);

  if (!activitat || !dia || !hora || !monitor || isNaN(aforament) || aforament < 1) {
    missatge.className = 'form-missatge form-missatge--error';
    missatge.textContent = 'Omple tots els camps correctament.';
    return;
  }

  const nova = new Sessio({
    id: generateSessioId(),
    activitat,
    dia,
    hora,
    monitor,
    aforament
  });

  addSessio(nova);
  missatge.className = 'form-missatge form-missatge--ok';
  missatge.textContent = `Sessió ${nova.id} afegida correctament.`;
  document.getElementById('add-sessio-form').reset();
  renderSessions();
}

document.getElementById('add-sessio-form').addEventListener('submit', handleAdd);

renderSessions();
