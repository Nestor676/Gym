
import { getReserves } from './storage.js';

function getOcupacioSessio(sessioId) {
  return getReserves().filter(r => r.sessioId === sessioId).length;
}

function crearBarraOcupacio(sessioId, aforament) {
  const ocupades = getOcupacioSessio(sessioId);
  const pct = aforament > 0 ? Math.min((ocupades / aforament) * 100, 100) : 0;

  let colorClass = 'barra--libre';
  if (pct >= 100) colorClass = 'barra--llena';
  else if (pct >= 70) colorClass = 'barra--alta';

  const wrapper = document.createElement('div');
  wrapper.className = 'barra-wrapper';
  wrapper.innerHTML = `
    <div class="barra-track">
      <div class="barra-hijo ${colorClass}" style="width: ${pct}%"></div>
    </div>
    <span class="barra-label">${ocupades} / ${aforament}</span>
  `;
  return wrapper;
}

export { getOcupacioSessio, crearBarraOcupacio };