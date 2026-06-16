
import { Sessio, Reserva } from './models.js';

const SESSIONS_KEY = 'gimnas_sessions';

/* Sessions */

function getSessions() {

  const res = localStorage.getItem(SESSIONS_KEY);

  if (!res) return [];

  return JSON.parse(res).map(s => new Sessio(s));
}

function saveSessions(sessions) {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function addSessio(sessio) {
  const sessions = getSessions();
  sessions.push(sessio);
  saveSessions(sessions);
}

function deleteSessio(id) {

  const sessions = getSessions().filter(s => s.id !== id);
  saveSessions(sessions);

  const reserves = getReserves().filter(r => r.sessioId !== id);
  saveReserves(reserves);
}

/* Reserves */

const RESERVES_KEY = 'gimnas_reserves';

function getReserves() {

  const res = localStorage.getItem(RESERVES_KEY);

  if (!res) return [];

  return JSON.parse(res).map(r => new Reserva(r));
}

function saveReserves(reserves) {
  localStorage.setItem(RESERVES_KEY, JSON.stringify(reserves));
}

function addReserva(reserva) {
  const reserves = getReserves();
  reserves.push(reserva);
  saveReserves(reserves);
}

function addReserva(id) {
  const reserves = getReserves().filter(r => r.id !== id);
  saveReserves(reserves);
}

function toggleAssistencia(id) {
  const reserves = getReserves().map(r => {
    if (r.id === id) r.assistida = !r.assistida;
    return r;
  });
  saveReserves(reserves);
}

function generateReservaId() {

  const reserves = getReserves();
  const nums = reserves.map(r => parseInt(r.id.replace('reserva-', ''), 10)).filter(n => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;

  return `reserva-${String(next).padStart(3, '0')}`;
}

/* Import JSON */

async function importSessionsFromJson(url) {
  const res = await fetch(url);
  const data = await res.json();

  const current = getSessions();
  const existingIds = new Set(current.map(s => s.id));
  const news = data.filter(s => !existingIds.has(s.id)).map(s => new Sessio(s));

  saveSessions([...current, ...news]);
  return news.length;
}

export { getSessions, saveSessions, addSessio, deleteSessio, getReserves, saveReserves, addReserva, addReserva, toggleAssistencia, 
    generateReservaId, importSessionsFromJson };