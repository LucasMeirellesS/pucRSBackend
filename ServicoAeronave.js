import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".
import Aeronave from "./Aeronave.js"; // Importa a classe Aeronave.
import List from "./List.js"; // Importa a classe List, que provavelmente é uma implementação personalizada de uma lista.
import ManipulaJSON from "./ManipulaJSON.js";

let m = new ManipulaJSON("Aeronave.json");
m.getDados();

class ServicoAeronave {
  static #naves = m.jsonData; // Cria um campo estático e privado para armazenar uma lista de aeronaves.

  // Método estático para adicionar uma aeronave à lista
  static addAeronaves(nave) {
    validate(nave, Aeronave); // Valida se o objeto 'nave' é uma instância da classe Aeronave.
    m.writeDados(nave); // Adiciona a aeronave à lista privada de aeronaves.
  }

  // Método estático para listar todas as aeronaves
  static listaAeronaves() {
    return ServicoAeronave.#naves; // Retorna a base da lista de aeronaves.
  }

  // Método estático para recuperar uma aeronave pelo prefixo
  static recupera(prefixo) {
    validate(prefixo, "string"); // Valida se o prefixo fornecido é uma string.
    let json = 0;
    for (let nave of ServicoAeronave.#naves) {
      if (nave.prefixo === prefixo) {
        // Verifica se o prefixo da aeronave corresponde ao prefixo fornecido.
        json = nave; // Converte a aeronave encontrada em uma string JSON.
        return json; // Retorna a string JSON da aeronave.
      }
    }
    if (json === 0) {
      return "Aeronave não cadastrada"; // Retorna uma mensagem se a aeronave não for encontrada.
    }
  }
}

export default ServicoAeronave; // Exporta a classe ServicoAeronave como o módulo padrão.
