import { validate } from "bycontract";

export class Piloto {
  #matricula;
  #nome;
  #habilitacao;
  constructor(matricula, nome, habilitacao) {
    validate(arguments, ["string", "string", "boolean"]);
    this.#matricula = matricula;
    this.#nome = nome;
    this.#habilitacao = habilitacao;
  }

  get matricula() {
    return this.#matricula;
  }

  get nome() {
    return this.#nome;
  }

  get habilitacao() {
    return this.#habilitacao;
  }

  set matricula(matricula) {
    validate(matricula, "Number");
    this.#matricula = matricula;
  }

  set nome(nome) {
    validate(nome, "String");
    this.#nome = nome;
  }

  set habilitacao(habilitacao) {
    validate(habilitacao, "Boolean");
    this.#habilitacao = habilitacao;
  }
  toString() {
    return `Piloto [Matrícula: ${this.#matricula}, Nome: ${
      this.#nome
    }, Habilitação: ${this.#habilitacao}]`;
  }

  // Método toJSON
  toJSON() {
    return {
      matricula: this.#matricula,
      nome: this.#nome,
      habilitacao: this.#habilitacao,
    };
  }
}

export default Piloto;
