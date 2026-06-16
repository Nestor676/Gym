
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

function cancelReserva(id) {
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

export { getSessions, saveSessions, addSessio, deleteSessio, getReserves, saveReserves };