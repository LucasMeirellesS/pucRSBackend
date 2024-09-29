import { validate } from "bycontract";
import { DateTime } from "luxon";
import ServicoAeronave from "./ServicoAeronave.js";
import ServicoPiloto from "./ServicoPiloto.js";
import { createRequire } from "module";
import ServicoAerovia from "./ServicoAerovia.js";
import ManipulaJSON from "./ManipulaJSON.js";
import List from "./List.js";
import OcupacaoAerovia from "./OcupacaoAerovia.js";
const require = createRequire(import.meta.url);

const fileName = "SlotsHorario.json";
const m = new ManipulaJSON(fileName);
m.getDados();

export function mkDatetime(year, month, day, hour, minute) {
  validate(arguments, ["number", "number", "number", "number", "number"]);
  return DateTime.fromObject({
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
  });
}

export function getTs(dateTime) {
  if (DateTime.isDateTime(dateTime)) {
    return DateTime.ts;
  } else {
    throw new Error("Tipo incorreto");
  }
}

export function verificaAeronave(prefixo) {
  validate(prefixo, "string");
  let aeronave = ServicoAeronave.recupera(prefixo);
  if (aeronave.hasOwnProperty("passageiros")) {
    return "Passageiros";
  } else if (aeronave.hasOwnProperty("carga")) {
    return "Carga";
  } else if (aeronave.hasOwnProperty("empresa")) {
    return "Particular";
  }
}

export function validaAeronave(tipo, altitude, hour, minute) {
  validate(arguments, ["string", "number", "number", "number"]);
  if (tipo === "Passageiros") {
    if (altitude > 28000) {
      return true;
    } else {
      return false;
    }
  } else if (tipo === "Particular") {
    if (altitude >= 25000 && altitude <= 27000) {
      return true;
    } else {
      return false;
    }
  } else if (tipo === "Carga") {
    if (hour >= 0 && hour <= 6) {
      if (hour === 6 && minute === 0) {
        return true;
      } else if (hour === 6 && minute > 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}

export function validaSlot(slots, slot) {
  validate(arguments, ["string[]", "string"]);
  if (!slots.includes(slot)) {
    return true;
  } else {
    return false;
  }
}

export function tempoVoo(aeroviaId, aeronavePrefixo) {
  validate(arguments, ["number", "string"]);
  let aerovia = ServicoAerovia.recupera(aeroviaId);
  let aeronave = ServicoAeronave.recupera(aeronavePrefixo);
  let ocupacao = Math.ceil(aerovia.tamanho / aeronave.v_cruzeiro);
  return ocupacao;
}

export function criaObjSlot(altitude, year, month, day, slots) {
  let obj = {
    altitude: altitude,
    ano: year,
    mes: month,
    dia: day,
    slotsOcupados: slots,
  };
  return obj;
}

export function encontraSlot(objSlot) {
  validate(objSlot, Object);
  let obj;
  for (let o of m.jsonData) {
    if (
      o.altitude === objSlot.altitude &&
      o.ano === objSlot.year &&
      o.mes === objSlot.month &&
      o.dia === objSlot.day
    ) {
      obj = o;
      return obj;
    }
  }
  return "Objeto não encontrado";
}

export function validaSlot2(
  altitude,
  year,
  month,
  day,
  hour,
  minute,
  aeroviaId,
  aeronavePrefixo
) {
  validate(arguments, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "string",
  ]);
  let tempo = tempoVoo(aeroviaId, aeronavePrefixo);
  let ocupacao = minute === 0 ? tempo : tempo + 1;
  let obj = criaObjSlot(altitude, year, month, day);
  let slot;
  if (encontraSlot(obj) != "Objeto não encontrado") {
    for (let i = 0; i < ocupacao; i++) {
      slot = hour + i;
      if (!validaSlot(obj.slotsOcupados, slot)) {
        console.log("Slot ocupado, escolha outro");
        return false;
      }
    }
    return true;
  } else {
    return true;
  }
}

export function retornaSlotsAltitude(altitude, day, year, month) {
  validate(altitude, "number");
  let obj = criaObjSlot(altitude, year, month, day);
  if (encontraSlot(obj) != "Objeto não encontrado") {
    let o = obj;
    return o.slotsOcupados;
  }

  return [];
}

export function validaAltitude(altitude, day, year, month) {}

export function atualizaSlot(
  objSlot,
  hour,
  minute,
  aeroviaId,
  aeronavePrefixo
) {
  validate(arguments, [Object, "number", "number", "number", "string"]);
  let tempo = tempoVoo(aeroviaId, aeronavePrefixo);
  let ocupacao = minute === 0 ? tempo : tempo + 1;
  let slot;

  try {
    for (let i = 0; i < ocupacao; i++) {
      slot = hour + i;
      objSlot.slotsOcupados.push(slot);
    }
    m.atualizaDados(objSlot);
  } catch (e) {
    console.error(`Deu ruim, meu chapa: ${e}`);
  }
}

export function adicionaSlot(
  objSlot,
  hour,
  minute,
  aeroviaId,
  aeronavePrefixo
) {
  validate(arguments, [Object, "number", "number", "number", "string"]);
  let tempo = tempoVoo(aeroviaId, aeronavePrefixo);
  let ocupacao = minute === 0 ? tempo : tempo + 1;
  let slot;
  try {
    for (let i = 0; i < ocupacao; i++) {
      slot = hour + i;
      objSlot.slotsOcupados.push(slot);
    }
    m.writeDados(objSlot);
  } catch (e) {
    console.error(`Deu ruim, meu chapa: ${e}`);
  }
}

export function retornaSlots() {
  return m.jsonData;
}

export function slotsHorarios(
  altitude,
  year,
  month,
  day,
  hour,
  minute,
  aeroviaId,
  aeronavePrefixo
) {
  validate(arguments, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "string",
  ]);

  let obj = criaObjSlot(altitude, year, month, day, []);

  let tempo = tempoVoo(aeroviaId, aeronavePrefixo);

  if (m.jsonData.length > 0) {
    obj = encontraSlot(obj);
    atualizaSlot(obj, hour, minute, aeroviaId, aeronavePrefixo);
  } else if (m.jsonData.length === 0) {
    adicionaSlot(obj, hour, minute, aeroviaId, aeronavePrefixo);
  }
}

export function validaPiloto(matricula) {
  validate(matricula, "string");
  let piloto = ServicoPiloto.recupera(matricula);
  console.log(piloto.habilitacao);
  return piloto.habilitacao;
}

export function validaPlanoVoo(
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
  let dt = mkDatetime(year, month, day, hour, minute);
  let verificaAero = verificaAeronave(aeronavePrefixo);
  let validaAero = validaAeronave(verificaAero, altitude, hour, minute);
  let ocupacaoAerovia = OcupacaoAerovia.isOcupad(dt, altitude, aeroviaId);

  if (
    validaAero &&
    validaPiloto(matricula) &&
    validaSlot2(
      altitude,
      year,
      month,
      day,
      hour,
      minute,
      aeroviaId,
      aeronavePrefixo
    ) &&
    !OcupacaoAerovia.isOcupad(dt, altitude, aeroviaId)
  ) {
    return true;
  } else {
    return false;
  }
}

// console.log(
//   mkDatetime(2024, 8, 19, 15, 0).equals(mkDatetime(2024, 8, 19, 15, 0))
// );

// console.log(DateTime.isDateTime(mkDatetime(2024, 8, 19, 15, 0)));
