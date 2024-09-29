// import Piloto from "./Piloto.js";
// import Aeronave from "./Aeronave.js";
// import Aerovias from "./Aerovias.js";
// import AeronavePassageiro from "./AeronavePassageiro.js";
// import AeronaveComercial from "./AeronaveComercial.js";
// import { DateTime } from "luxon";
import * as fp from "./FunctionsProjeto.js";
import { validate } from "bycontract";
import List from "./List.js";
import Altitudes from "./Altitudes.js";
import { createRequire } from "module";
import ServicoPlanos from "./ServicoPlanos.js";
const require = createRequire(import.meta.url);

class PlanoVoo {
  #id;
  #matriculaPiloto;
  #prefixoAeronave;
  #data;
  #horario;
  #dateTime;
  #aerovia;
  #altitude;
  #cancelado = false;
  #aprovado = false;
  #cont = 0;
  constructor(
    matricula,
    aeronavePrefixo,
    aeroviaId,
    altitude,
    year,
    month,
    day,
    hour,
    minute
  ) {
    validate(arguments, [
      "string",
      "string",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    let aproved = false;
    this.#matriculaPiloto = matricula;
    this.#prefixoAeronave = aeronavePrefixo;
    let dt = fp.mkDatetime(year, month, day, hour, minute);
    let horario = dt.toISOTime();
    let data = dt.toISODate();

    if (Altitudes.hasAltitude(altitude)) {
      this.#altitude = altitude;
    } else {
      throw new Error("Altitude inválida!");
    }

    this.#horario = horario;
    this.#data = data;
    this.#altitude = altitude;
    this.#dateTime = dt;
    let horarioAltitude = {
      dataHora: dt,
      altitude: altitude,
    };
    // PlanoVoo.#slotsHorarios.push(horarioAltitude);
    // aproved = true;
    this.#aerovia = aeroviaId;

    this.defineID();
    this.#id = this.getId2Change();
  }

  cancelaDescancelaVoo() {
    this.#cancelado = !this.#cancelado;
  }

  // changeId() {
  //   PlanoVoo.#cont++;
  // }

  aprovaDesaprovaVoo() {
    if (this.#cancelado) {
      console.log("O voo está cancelado, não pode ser aprovado");
      this.#aprovado = false;
    } else {
      this.#aprovado = !this.#aprovado;
    }
  }

  getId2Change() {
    return this.#cont;
  }

  defineID() {
    let jsonData = []; // Inicializa como um array vazio por padrão
    const fs = require("fs");
    const fileName = "PlanoVoo.json";
    let conta = 0;

    try {
      const data = fs.readFileSync(fileName, "utf8");
      if (data.length > 0) {
        jsonData = JSON.parse(data);
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          conta = jsonData[jsonData.length - 1].id; // Acessa o último item do array
          this.#cont = conta + 1;
        } else {
          // Se não for um array ou estiver vazio, começa de zero
          this.#cont = 0;
        }
      } else {
        this.#cont = 0; // Arquivo está vazio
      }
    } catch (e) {
      console.error("Erro ao analisar o JSON:", e);
      this.#cont = 0; // Em caso de erro, também começa de zero
    }
  }

  get id() {
    return this.#id;
  }

  get matriculaPiloto() {
    return this.#matriculaPiloto;
  }

  get prefixoAeronave() {
    return this.#prefixoAeronave;
  }

  get dateTime() {
    return this.#dateTime;
  }

  get dataHora() {
    return `${this.#data} ${this.#horario}`;
  }

  get aerovia() {
    return this.#aerovia;
  }

  get altitude() {
    return this.#altitude;
  }

  // static slotsHorarios() {
  //   return PlanoVoo.#slotsHorarios;
  // }

  // static slotVazio() {
  //   return PlanoVoo.#slotsHorarios.isEmpty();
  // }

  toJSON() {
    return {
      id: this.#id,
      matriculaPiloto: this.#matriculaPiloto,
      prefixoAeronave: this.#prefixoAeronave,
      data: this.#data,
      horario: this.#horario,
      aerovia: this.#aerovia,
      altitude: this.#altitude,
      cancelado: this.#cancelado,
    };
  }

  toString() {
    return `Plano de Voo ID: ${this.#id}\nPiloto: ${
      this.#matriculaPiloto
    }\nAeronave: ${this.#prefixoAeronave}\nData e Hora: ${this.#data} ${
      this.#horario
    }\nAerovia: ${this.#aerovia}\nAltitude: ${
      this.#altitude
    } metros\nCancelado: ${this.#cancelado ? "Sim" : "Não"}`;
  }
}

export default PlanoVoo;
