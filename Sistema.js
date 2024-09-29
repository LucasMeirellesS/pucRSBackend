import ServicoAerovia from "./ServicoAerovia.js";
import ServicoPiloto from "./ServicoPiloto.js";
import ServicoAeronave from "./ServicoAeronave.js";
import ServicoAerovia from "./ServicoAerovia.js";
import PlanoVoo from "./PlanoVoo.js";
import { validate } from "bycontract";
import Aeronave from "./Aeronave.js";
import AeronavePassageiro from "./AeronavePassageiro.js";
import AeronaveParticular from "./AeronaveParticular.js";
import AeronaveCarga from "./AeronaveCarga.js";

export function listarAltitudesLivres(altitudes) {
  console.log("------------------------------\n");
  console.log("Altitudes livres:");
  for (let alt of altitudes) {
    console.log(alt);
  }
  console.log("------------------------------\n");
}

export function listarAerovias() {
  console.log("------------------------------\n");
  console.log("Aerovias:");
  for (let aero of ServicoAerovia.listaAerovia()) {
    console.log(aero);
  }
  console.log("------------------------------\n");
}

function validaAero(aeronave, planoVoo) {
  validate(arguments, [Aeronave, PlanoVoo]);
  if (aeronave instanceof AeronavePassageiro) {
    if (planoVoo.altitude > 28000) {
      return true;
    } else {
      return false;
    }
  } else if (aeronave instanceof AeronaveParticular) {
    if (planoVoo.altitude > 25000 && planoVoo.altitude < 27000) {
      return true;
    } else {
      return false;
    }
  } else if (aeronave instanceof AeronaveCarga) {
    if (
      Number(planoVoo.horario.split(":")[0]) >= 0 &&
      Number(planoVoo.horario.split(":")[0]) <= 6
    ) {
      if (
        Number(planoVoo.horario.split(":")[0]) === 6 &&
        Number(planoVoo.horario.split(":")[1]) > 0
      ) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}

export function aprovarPlanoDeVoo(planoVoo) {
  validate(planoVoo, PlanoVoo);
  let piloto = ServicoPiloto.recupera(planoVoo.matriculaPiloto);
  let aeronave = ServicoAeronave.recupera(planoVoo.prefixoAeronave);
  let aerovia = ServicoAerovia.recupera(planoVoo.aerovia);
  if (
    piloto.habilitacao &&
    aeronave.autonomia > aerovia.tamanho + aerovia.tamanho * 0.1 &&
    PlanoVoo.validateDateTime(
      planoVoo.datTime,
      planoVoo.altitude,
      planoVoo.aerovia
    ) &&
    validaAero(aeronave, planoVoo)
  ) {
    planoVoo.aprovaDesaprovaVoo();
  }
}
