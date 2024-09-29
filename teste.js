// import * as fp from "./FunctionsProjeto.js";

// let dt = fp.mkDatetime(2024, 3, 20, 6, 0);
// let horario = dt.toISOTime();
// let data = dt.toISODate();

// Number(horario.split(":")[0]);

// const range = (a, b) => (a > b ? [] : [a, ...range(a + 1, b)]);
// const produto = (arr) => arr.reduce((p, a) => p * a, 1);
// const fatorialV1 = (n) => produto(range(1, n));

// console.log(range(1, 6));

// let v = [6, 7, 8];

// console.log([1, 2, 3, ...[6]]);

// let soma = (x) => (y) => y + x;
// let i = soma(1);

// console.log(i(6));

// console.log(soma(1)(4));

// const p = new Promise((resolve, reject) => {
//   setTimeout(reject, 1000, new Error("Falha"));
// });
// setTimeout(console.log, 0, p);

// setTimeout(console.log, 3000, p);

// try {
//   console.log(algo);
// } catch (e) {
//   console.error(e.message);
// }

// async function funcaoTeste() {
//   return 1;
// }

// funcaoTeste().then(console.log);
// console.log(4);

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// const fs = require("fs");

// // Nome do arquivo JSON
// const fileName = "Aerovia.json";

// // Novo objeto a ser adicionado
// // const newObject = { teste4: 22, teste5: "teste777" };

// // Verifica se o arquivo existe
// if (fs.existsSync(fileName)) {
//   console.log("O arquivo JSON existe.");

//   // Lê o conteúdo do arquivo JSON
//   const data = fs.readFileSync(fileName, "utf8");
//   let jsonData;

//   try {
//     jsonData = JSON.parse(data);
//   } catch (parseError) {
//     console.error("Erro ao analisar o JSON:", parseError);
//   }

//   // Verifica se jsonData é um array
//   if (Array.isArray(jsonData)) {
//     // Adiciona o novo objeto à lista existente
//     jsonData.push(newObject);

//     // Converte a lista atualizada para string JSON antes de gravar
//     fs.writeFileSync(fileName, JSON.stringify(jsonData, null, 2));
//     console.log("Novo objeto foi adicionado ao arquivo JSON.");
//     console.log(jsonData[jsonData.length - 1].id);
//     let conta = jsonData[jsonData.length - 1].id;
//     let c = conta + 1;
//     console.log(c);
//   } else {
//     console.log("O conteúdo do arquivo JSON não é um array de objetos.");
//   }
// } else {
//   console.log("O arquivo JSON não existe.");

//   // Se o arquivo não existir, cria um novo arquivo com o novo objeto dentro de um array
//   fs.writeFileSync(fileName, JSON.stringify([newObject], null, 2));
//   console.log("Arquivo JSON criado e novo objeto adicionado.");
// }

// atualizaDados(objeto) {
//     validate(objeto, Object); // Validar que o input é um objeto

//     // Ler os dados existentes primeiro
//     this.getDados();

//     // Procurar o objeto que corresponda a 'altitude', 'hora' e 'minuto'
//     this.#jsonData;
//     let obj = 0;
//     for (let o in this.#jsonData) {
//       if (
//         item.altitude === objeto.altitude &&
//         item.hora === objeto.hora &&
//         item.minuto === objeto.minuto
//       ) {
//         obj = o;
//       }
//     }

//     if (obj === 0) {
//       console.error(
//         "Objeto não encontrado no JSON. Não foi possível atualizar."
//       );
//       return;
//     }

//     // Atualizar o objeto existente no array
//     this.#jsonData[objetoExistenteIndex] = {
//       ...this.#jsonData[objetoExistenteIndex],
//       ...objeto,
//     };

//     // Escrever os dados atualizados de volta ao arquivo JSON
//     ManipulaJSON.fs.writeFileSync(
//       this.fileName,
//       JSON.stringify(this.#jsonData, null, 2)
//     );

//     console.log("Objeto atualizado com sucesso!");
//   }

const array1 = [1, 2, 3];
const array2 = [1, 2, 3];

const allElementsExist = array1.every((element) => array2.includes(element));

console.log(allElementsExist); // true
