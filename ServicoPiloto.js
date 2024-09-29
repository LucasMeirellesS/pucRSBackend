import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".
import List from "./List.js"; // Importa a classe List, que provavelmente é uma implementação personalizada de uma lista.
import Piloto from "./Piloto.js"; // Importa a classe Piloto.
import ManipulaJSON from "./ManipulaJSON.js";

let m = new ManipulaJSON("Piloto.json");
m.getDados();

class ServicoPiloto {
  static #pilotos = m.jsonData; // Cria um campo estático e privado para armazenar uma lista de pilotos.

  // Método estático para adicionar um piloto à lista
  static addPiloto(piloto) {
    validate(piloto, Piloto); // Valida se o objeto 'piloto' é uma instância da classe Piloto.
    m.writeDados(piloto); // Adiciona o piloto à lista privada de pilotos.
  }

  // Método estático para listar todos os pilotos
  static listaPiloto() {
    return ServicoPiloto.#pilotos; // Retorna a base da lista de pilotos.
  }

  // Método estático para recuperar um piloto pela matrícula
  static recupera(matricula) {
    validate(matricula, "string"); // Valida se a matrícula fornecida é uma string.
    let json = 0;
    for (let piloto of ServicoPiloto.#pilotos) {
      if (piloto.matricula === matricula) {
        // Verifica se a matrícula do piloto corresponde à matrícula fornecida.
        json = piloto; // Converte o piloto encontrado em uma string JSON.
        return json; // Retorna a string JSON do piloto.
      }
    }
    if (json === 0) {
      return "Piloto não encontrado"; // Retorna uma mensagem se o piloto não for encontrado.
    }
  }
}

export default ServicoPiloto; // Exporta a classe ServicoPiloto como o módulo padrão.
