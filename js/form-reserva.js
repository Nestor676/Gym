
import { getSessions } from './storage.js';
import { getOcupacioSessio } from './ocupacio.js';

function populateSelect() {
  const select = document.getElementById('sessio-select');
  const sessions = getSessions();
  select.innerHTML = '<option value="">-- Selecciona una sessió --</option>';

  sessions.forEach(s => {
    const ocupades = getOcupacioSessio(s.id);
    const lliures = s.aforament - ocupades;
    const plena = lliures <= 0;
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.activitat} – ${s.dia} ${s.hora} (${plena ? 'PLENA' : lliures + ' lliures'})`;
    if (plena) opt.disabled = true;
    select.appendChild(opt);
  });
}

populateSelect();
