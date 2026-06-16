
import { getSessions, getReserves, addReserva, generateReservaId } from './storage.js';
import { getOcupacioSessio } from './ocupacio.js';
import { Reserva } from './models.js';

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
    opt.textContent = `${s.activitat} – ${s.dia} ${s.hora} (${plena ? 'Llena' : lliures + ' lliures'})`;
    if (plena) opt.disabled = true;
    select.appendChild(opt);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const nomSoci = document.getElementById('nom-soci').value.trim();
  const sessioId = document.getElementById('sessio-select').value;
  const missatgeError = document.getElementById('missatge-error');
  const missatgeOk = document.getElementById('missatge-ok');

  missatgeError.textContent = '';
  missatgeOk.textContent = '';

  if (!nomSoci || !sessioId) {
    missatgeError.textContent = 'Llena los campos obligatorios.';
    return;
  }

  const sessions = getSessions();
  const sessio = sessions.find(s => s.id === sessioId);
  const ocupades = getOcupacioSessio(sessioId);

  if (ocupades >= sessio.aforament) {
    missatgeError.textContent = 'Sesion llena.';
    return;
  }

  const nova = new Reserva({
    id: generateReservaId(),
    sessioId,
    nomSoci,
    assistida: false
  });

  addReserva(nova);
  missatgeOk.textContent = `Reserva ${nova.id} creada correctamente por ${nomSoci}!`;
  document.getElementById('reserva-form').reset();
  populateSelect();
}

document.getElementById('reserva-form').addEventListener('submit', handleSubmit);

populateSelect();
