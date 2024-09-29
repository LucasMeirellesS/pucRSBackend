import { validate } from "bycontract"; // Importa a função de validação de contratos da biblioteca "bycontract".

class Aeronave {
  #prefixo; // Campo privado para armazenar o prefixo da aeronave.
  #v_cruzeiro; // Campo privado para armazenar a velocidade de cruzeiro da aeronave.
  #autonomia; // Campo privado para armazenar a autonomia da aeronave.

  // Construtor da classe Aeronave
  constructor(prefixo, v_cruzeiro, autonomia) {
    // Valida os tipos dos argumentos passados para o construtor
    validate(arguments, ["string", "number", "number"]);
    this.#prefixo = prefixo; // Inicializa o prefixo da aeronave.
    this.#v_cruzeiro = v_cruzeiro; // Inicializa a velocidade de cruzeiro da aeronave.
    this.#autonomia = autonomia; // Inicializa a autonomia da aeronave.
  }

  // Getter para o prefixo da aeronave
  get prefixo() {
    return this.#prefixo;
  }

  // Getter para a velocidade de cruzeiro da aeronave
  get v_cruzeiro() {
    return this.#v_cruzeiro;
  }

  // Getter para a autonomia da aeronave
  get autonomia() {
    return this.#autonomia;
  }

  // Setter para o prefixo da aeronave
  set prefixo(prefixo) {
    validate(prefixo, "string"); // Valida se o novo prefixo é uma string.
    this.#prefixo = prefixo; // Define o novo valor para o prefixo.
  }

  // Setter para a velocidade de cruzeiro da aeronave
  set v_cruzeiro(v_cruzeiro) {
    validate(v_cruzeiro, "number"); // Valida se a nova velocidade de cruzeiro é um número.
    this.#v_cruzeiro = v_cruzeiro; // Define o novo valor para a velocidade de cruzeiro.
  }

  // Setter para a autonomia da aeronave
  set autonomia(autonomia) {
    validate(autonomia, "number"); // Valida se a nova autonomia é um número.
    this.#autonomia = autonomia; // Define o novo valor para a autonomia.
  }

  // Método para representar a aeronave como uma string
  toString() {
    return `Aeronave [Prefixo: ${this.#prefixo}, Velocidade de Cruzeiro: ${
      this.#v_cruzeiro
    } km/h, Autonomia: ${this.#autonomia} km]`;
  }

  // Método para representar a aeronave como um objeto JSON
  toJSON() {
    return {
      prefixo: this.#prefixo,
      v_cruzeiro: this.#v_cruzeiro,
      autonomia: this.#autonomia,
    };
  }
}

export default Aeronave; // Exporta a classe Aeronave como o módulo padrão.
