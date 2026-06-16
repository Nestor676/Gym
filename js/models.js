
class Sessio {
  constructor({ id, activitat, dia, hora, monitor, aforament }) {
    this.id = id;
    this.activitat = activitat;
    this.dia = dia;
    this.hora = hora;
    this.monitor = monitor;
    this.aforament = aforament;
  }
}

class Reserva {
  constructor({ id, sessioId, nomSoci, assistida = false }) {
    this.id = id;
    this.sessioId = sessioId;
    this.nomSoci = nomSoci;
    this.assistida = assistida;
  }
}

export { Sessio, Reserva };
