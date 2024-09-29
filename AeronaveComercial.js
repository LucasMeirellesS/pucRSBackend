import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".
import Aeronave from "./Aeronave.js"; // Importa a classe base Aeronave.

class AeronaveComercial extends Aeronave {
  #companhia; // Campo privado para armazenar a companhia aérea associada à aeronave comercial.

  // Construtor da classe AeronaveComercial
  constructor(prefixo, v_cruzeiro, autonomia, companhia) {
    // Valida os tipos dos argumentos passados para o construtor
    validate(arguments, ["string", "number", "number", "string"]);
    super(prefixo, v_cruzeiro, autonomia); // Chama o construtor da classe base Aeronave.
    this.#companhia = companhia; // Inicializa a companhia associada à aeronave comercial.
  }

  // Getter para a companhia da aeronave comercial
  get companhia() {
    return this.#companhia;
  }

  // Setter para a companhia da aeronave comercial
  set companhia(companhia) {
    this.#companhia = companhia; // Define o novo valor para a companhia.
  }

  // Método para representar a aeronave comercial como uma string
  toString() {
    return `${super.toString()}, Companhia: ${this.#companhia}`; // Inclui os detalhes da companhia no resultado.
  }

  // Método para representar a aeronave comercial como um objeto JSON
  toJSON() {
    const json = super.toJSON(); // Obtém a representação JSON da classe base.
    return {
      ...json, // Espalha as propriedades JSON da classe base.
      companhia: this.#companhia, // Adiciona a propriedade "companhia" ao JSON.
    };
  }
}

export default AeronaveComercial; // Exporta a classe AeronaveComercial como o módulo padrão.
