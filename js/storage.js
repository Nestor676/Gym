
import { Sessio, Reserva } from './models.js';

const SESSIONS_KEY = 'gimnas_sessions';

/* Sessions */
function getSessions() {

  const res = localStorage.getItem(SESSIONS_KEY);

  if (!res) return [];

  return JSON.parse(res).map(s => new Sessio(s));
}

export { getSessions };
