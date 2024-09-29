import { validate } from "bycontract";
import AeronaveComercial from "./AeronaveComercial.js";

export class AeronaveCarga extends AeronaveComercial {
  #carga;
  constructor(prefixo, v_cruzeiro, autonomia, companhia, carga) {
    validate(arguments, ["string", "number", "number", "string", "number"]);
    super(prefixo, v_cruzeiro, autonomia, companhia);

    this.#carga = carga;
  }

  get carga() {
    return this.#carga;
  }

  set carga(carga) {
    validate(carga, "number");
    this.#carga = carga;
  }

  toString() {
    return `Aeronave de Carga: ${super.toString()},  Carga Suportada: ${
      this.carga
    } kg]`;
  }

  toJSON() {
    const json = super.toJSON();
    return {
      ...json,
      carga: this.carga,
    };
  }
}

export default AeronaveCarga;
