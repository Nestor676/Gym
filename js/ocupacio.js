
import { getReserves } from './storage.js';

function getOcupacioSessio(sessioId) {
  return getReserves().filter(r => r.sessioId === sessioId).length;
}

export { getOcupacioSessio };