
import { getSessions } from './storage.js';

function generateSessioId() {

  const sessions = getSessions();

  const nums = sessions.map(s => parseInt(s.id.replace('s-', ''), 10)).filter(n => !isNaN(n));

  const next = nums.length ? Math.max(...nums) + 1 : 1;

  return `s-${String(next).padStart(3, '0')}`;
}