import Aerovia from "./Aerovias.js"; // Importa a classe Aerovia.
import ManipulaJSON from "./ManipulaJSON.js";
import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".

let m = new ManipulaJSON("Aerovia.json");
m.getDados();
class ServicoAerovia {
  static #aerovias = m.jsonData; // Cria um campo estático e privado para armazenar uma lista de aerovias.

  // Método estático para adicionar uma aerovia à lista
  static addAerovia(aerovia) {
    validate(aerovia, Aerovia); // Valida se o objeto 'aerovia' é uma instância da classe Aerovia.
    m.writeDados(aerovia);
  }

  // Método estático para listar todas as aerovias
  static listaAerovia() {
    return ServicoAerovia.#aerovias; // Retorna a base da lista de aerovias.
  }

  // Método estático para recuperar uma aerovia pelo ID
  static recupera(id) {
    validate(id, "number"); // Valida se o ID fornecido é um número.
    let json = 0;
    for (let aerovia of ServicoAerovia.#aerovias) {
      if (aerovia.id === id) {
        // Verifica se o ID da aerovia corresponde ao ID fornecido.
        json = aerovia; // Converte a aerovia encontrada em uma string JSON.
        return json; // Retorna a string JSON da aerovia.
      }
    }
    if (json === 0) {
      return "Aerovia não encontrada!"; // Retorna uma mensagem se a aerovia não for encontrada.
    }
  }

  static entreAeroportos(a1, a2) {
    validate(arguments, ["string", "string"]);
    let lista = [];
    for (let a of ServicoAerovia.listaAerovia()) {
      if (a.origem === a1 && a.destino === a2) {
        lista.push(a);
      } else if (a.origem === a2 && a.destino === a1) {
        lista.push(a);
      }
    }
    if (lista.length === 0) {
      console.log("Nenhuma aerovia entre essas duas cidades foi encontrada.");
    }
    return lista;
  }
}

export default ServicoAerovia; // Exporta a classe ServicoAerovia como o módulo padrão.
