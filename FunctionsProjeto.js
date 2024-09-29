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
  validate(arguments, ["number[]", "number"]);
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
      o.ano === objSlot.ano &&
      o.mes === objSlot.mes &&
      o.dia === objSlot.dia
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
    obj = encontraSlot(obj);
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
  validate(arguments, ["number", "number", "number", "number"]);
  let obj = criaObjSlot(altitude, year, month, day);

  if (encontraSlot(obj) != "Objeto não encontrado") {
    obj = encontraSlot(obj);

    return obj.slotsOcupados;
  }

  return [];
}

export function calculaSlot(hour, minute, aeroviaId, aeronavePrefixo) {
  validate(arguments, ["number", "number", "number", "string"]);
  let tempo = tempoVoo(aeroviaId, aeronavePrefixo);
  let ocupacao = minute === 0 ? tempo : tempo + 1;
  let slots = [];
  let slot;
  for (let i = 0; i < ocupacao; i++) {
    slot = hour + i;
    slots.push(slot);
  }
  return slots;
}

export function altitudesLivres(
  altitudes,
  day,
  year,
  month,
  hour,
  minute,
  aeroviaId,
  aeronavePrefixo
) {
  validate(arguments, [
    "number[]",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "string",
  ]);
  let altitudesLivres = [];
  let slotsAlt;
  let slotsVerifica = calculaSlot(hour, minute, aeroviaId, aeronavePrefixo);
  for (let altitude of altitudes) {
    slotsAlt = retornaSlotsAltitude(altitude, day, year, month);
    let allElementsExist = slotsVerifica.every((element) =>
      slotsAlt.includes(element)
    );
    if (!allElementsExist) {
      altitudesLivres.push(altitude);
    }
  }
  return altitudesLivres;
}

export function altitudesLivres2(altitudes, day, year, month, slot) {
  validate(arguments, ["number[]", "number", "number", "number", "number"]);
  let altitudesLivres = [];
  let slotsAlt;
  for (let altitude of altitudes) {
    slotsAlt = retornaSlotsAltitude(altitude, day, year, month);
    let allElementsExist = slotsAlt.includes(slot);

    if (!allElementsExist) {
      altitudesLivres.push(altitude);
    }
  }
  return altitudesLivres;
}

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

export function convertStringNumber(listNumberString) {
  validate(listNumberString, "String");
  let numerosAConverter = listNumberString.split(",");
  let numeros = [];
  try {
    for (let n of numerosAConverter) {
      let nNumber = Number(n);
      if (nNumber < 0 || nNumber > 23) {
        console.log("Não podem haver números menores que 0 e maiores que 23");
        return "volta";
      }
      numeros.push(nNumber);
    }
    return numeros;
  } catch (e) {
    console.error(`Deu ruim, meu chapa: ${e}`);
  }
}
