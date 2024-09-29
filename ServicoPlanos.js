import { validate } from "bycontract";
import List from "./List.js";
import PlanoVoo from "./PlanoVoo.js";

import ManipulaJSON from "./ManipulaJSON.js";

let m = new ManipulaJSON("PlanoVoo.json");
m.getDados();

class ServicoPlanos {
  static #planos = m.jsonData;

  static addPlanos(plano) {
    validate(plano, PlanoVoo);
    m.writeDados(plano);
  }

  static listaPlanos() {
    return ServicoPlanos.#planos;
  }

  static recupera(id) {
    validate(id, "string");
    for (let plano of ServicoPlanos.#planos.base) {
      if (plano.id === id) {
        return plano;
      }
    }
    throw new Error("Não cadastrado!");
  }
}
export default ServicoPlanos;
