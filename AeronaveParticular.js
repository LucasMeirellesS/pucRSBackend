import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".
import Aeronave from "./Aeronave.js"; // Importa a classe base Aeronave.

class AeronaveParticular extends Aeronave {
  #empresa; // Campo privado para armazenar o nome da empresa associada à aeronave particular.

  // Construtor da classe AeronaveParticular
  constructor(empresa, prefixo, v_cruzeiro, autonomia, companhia) {
    // Valida os tipos dos argumentos passados para o construtor
    validate(arguments, ["string", "string", "number", "number", "string"]);
    super(prefixo, v_cruzeiro, autonomia, companhia); // Chama o construtor da classe base Aeronave.
    this.#empresa = empresa; // Inicializa a empresa associada à aeronave particular.
  }

  // Getter para a empresa da aeronave particular
  get empresa() {
    return this.#empresa;
  }

  // Setter para a empresa da aeronave particular
  set empresa(novaEmpresa) {
    validate(novaEmpresa, "string"); // Valida o novo valor da empresa.
    this.#empresa = novaEmpresa; // Define o novo valor para a empresa.
  }

  // Método para representar a aeronave particular como uma string
  toString() {
    return `Aeronave Particular: ${super.toString()}, Empresa: ${
      this.#empresa
    }`;
    // Inclui os detalhes da empresa no resultado, junto com a representação da classe base.
  }

  // Método para representar a aeronave particular como um objeto JSON
  toJSON() {
    const json = super.toJSON(); // Obtém a representação JSON da classe base.
    return {
      ...json, // Espalha as propriedades JSON da classe base.
      empresa: this.#empresa, // Adiciona a propriedade "empresa" ao JSON.
    };
  }
}

export default AeronaveParticular; // Exporta a classe AeronaveParticular como o módulo padrão.
