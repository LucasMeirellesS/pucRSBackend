import { validate } from "bycontract";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

class ManipulaJSON {
  static fs = require("fs");

  #fileName;
  #jsonData = [];

  constructor(fileName) {
    this.#fileName = fileName;
  }

  get fileName() {
    return this.#fileName;
  }

  get jsonData() {
    return this.#jsonData;
  }

  getDados() {
    try {
      const data = ManipulaJSON.fs.readFileSync(this.fileName, "utf8");
      this.#jsonData = JSON.parse(data); // Corrigido para usar o atributo privado corretamente
      if (!Array.isArray(this.#jsonData)) {
        throw new Error(
          "O JSON não é um array. O arquivo deve conter um array de objetos."
        );
      }
    } catch (e) {
      console.error(`Deu treta: ${e}`);
    }
  }

  writeDados(objeto) {
    validate(objeto, Object);
    try {
      this.#jsonData.push(objeto.toJSON());
      ManipulaJSON.fs.writeFileSync(
        this.fileName,
        JSON.stringify(this.#jsonData, null, 2)
      );
    } catch (e) {
      try {
        this.#jsonData.push(objeto);
        ManipulaJSON.fs.writeFileSync(
          this.fileName,
          JSON.stringify(this.#jsonData, null, 2)
        );
      } catch (e) {
        console.error(e);
      }
    }
  }

  atualizaDados(objeto) {
    validate(objeto, Object); // Validar que o input é um objeto

    // Ler os dados existentes primeiro
    this.getDados();

    // Procurar o objeto que corresponda a 'altitude', 'hora' e 'minuto'
    this.#jsonData;
    let index = -1;

    for (let i = 0; i < this.#jsonData.length; i++) {
      console.log(this.#jsonData[i]);
      if (
        this.#jsonData[i].altitude === objeto.altitude &&
        this.#jsonData[i].ano === objeto.ano &&
        this.#jsonData[i].dia === objeto.dia &&
        this.#jsonData[i].mes === objeto.mes
      ) {
        index = i;
        console.log(i);
      }
    }

    if (index === -1) {
      console.error(
        "Objeto não encontrado no JSON. Não foi possível atualizar."
      );
      return;
    }

    // Atualizar o objeto existente no array
    this.#jsonData[index] = {
      ...this.#jsonData[index],
      ...objeto,
    };

    // Escrever os dados atualizados de volta ao arquivo JSON
    ManipulaJSON.fs.writeFileSync(
      this.fileName,
      JSON.stringify(this.#jsonData, null, 2)
    );

    console.log("Objeto atualizado com sucesso!");
  }
}

export default ManipulaJSON;
