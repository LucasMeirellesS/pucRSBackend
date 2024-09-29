import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".

import { createRequire } from "module";
const require = createRequire(import.meta.url);

class Aerovias {
  #id; // Campo privado para armazenar o ID da aerovia.
  #origem; // Campo privado para armazenar o ponto de origem da aerovia.
  #destino; // Campo privado para armazenar o ponto de destino da aerovia.
  #tamanho; // Campo privado para armazenar o tamanho da aerovia.
  #cont; // Contador estático para gerar IDs únicos para as instâncias.

  // Construtor da classe Aerovias
  constructor(origem, destino, tamanho) {
    // Valida os tipos dos argumentos passados para o construtor
    validate(arguments, ["string", "string", "number"]);
    this.defineID();
    this.#id = this.getId2Change(); // Atribui um ID único usando o contador estático.
    // this.changeId(); // Incrementa o contador de IDs para a próxima instância.
    this.#origem = origem; // Inicializa o ponto de origem.
    this.#destino = destino; // Inicializa o ponto de destino.
    this.#tamanho = tamanho; // Inicializa o tamanho.
  }

  // Getter para o ID
  get id() {
    return this.#id;
  }

  // Setter para o ID com validação
  set id(id) {
    validate(id, "string");
    this.#id = id;
  }

  // Getter para o ponto de origem
  get origem() {
    return this.#origem;
  }

  // Setter para o ponto de origem com validação
  set origem(origem) {
    validate(origem, "string");
    this.#origem = origem;
  }

  // Getter para o ponto de destino
  get destino() {
    return this.#destino;
  }

  // Setter para o ponto de destino com validação
  set destino(destino) {
    validate(destino, "string");
    this.#destino = destino;
  }

  // Getter para o tamanho
  get tamanho() {
    return this.#tamanho;
  }

  // Setter para o tamanho com validação
  set tamanho(tamanho) {
    validate(tamanho, "number");
    this.#tamanho = tamanho;
  }

  defineID() {
    let jsonData;
    let fs = require("fs");

    let conta = 0;

    const fileName = "Aerovia.json";

    try {
      const data = fs.readFileSync(fileName, "utf8");
      if (data.length > 0) {
        jsonData = JSON.parse(data);
        conta = jsonData[jsonData.length - 1].id;
      }
      this.#cont = conta + 1;
    } catch (e) {
      console.error("Erro ao analisar o JSON:", e);
    }
  }

  // Método para incrementar o contador estático de IDs
  // changeId() {
  //   Aerovias.#cont++;
  // }

  // Método para obter o valor atual do contador de IDs
  getId2Change() {
    return this.#cont;
  }

  // Método para representar a aerovia como uma string
  toString() {
    return `Aerovias [ID: ${this.#id}, Origem: ${this.#origem}, Destino: ${
      this.#destino
    }, Tamanho: ${this.#tamanho}]`;
  }

  // Método para converter a aerovia para JSON
  toJSON() {
    return {
      id: this.#id,
      origem: this.#origem,
      destino: this.#destino,
      tamanho: this.#tamanho,
    };
  }
}

export default Aerovias; // Exporta a classe Aerovias como o módulo padrão.
