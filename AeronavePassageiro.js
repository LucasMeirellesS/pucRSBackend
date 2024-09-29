import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".
import AeronaveComercial from "./AeronaveComercial.js"; // Importa a classe base AeronaveComercial.

export class AeronavePassageiro extends AeronaveComercial {
  #passageiros; // Campo privado para armazenar o número de passageiros.

  // Construtor da classe AeronavePassageiro
  constructor(prefixo, v_cruzeiro, autonomia, companhia, passageiros) {
    // Valida os tipos dos argumentos passados para o construtor
    validate(arguments, ["string", "number", "number", "string", "number"]);
    super(prefixo, v_cruzeiro, autonomia, companhia); // Chama o construtor da classe base AeronaveComercial.

    this.#passageiros = passageiros; // Inicializa o número de passageiros.
  }

  // Getter para o número de passageiros
  get passageiros() {
    return this.#passageiros;
  }

  // Setter para o número de passageiros
  set passageiros(passageiros) {
    validate(passageiros, "number"); // Valida o novo valor do número de passageiros.
    this.#passageiros = passageiros; // Define o novo valor para o número de passageiros.
  }

  // Método para representar a aeronave de passageiros como uma string
  toString() {
    return `Aeronave de Passageiros: ${super.toString()}, Numero de passageiros: ${
      this.passageiros
    }`;
    // Inclui o número de passageiros no resultado, junto com a representação da classe base.
  }
}

// Criação de uma instância de AeronavePassageiro para teste
let aero = new AeronavePassageiro("D", 3000, 2000, "Alguma", 400);

export default AeronavePassageiro; // Exporta a classe AeronavePassageiro como o módulo padrão.
