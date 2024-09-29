import Piloto from "./Piloto.js"; // Importa a classe Piloto.
import AeronaveCarga from "./AeronaveCarga.js"; // Importa a classe AeronaveCarga.
import AeronaveComercial from "./AeronaveComercial.js"; // Importa a classe AeronaveComercial.
import AeronaveParticular from "./AeronaveParticular.js"; // Importa a classe AeronaveParticular.
import ServicoPiloto from "./ServicoPiloto.js"; // Importa o serviço responsável por gerenciar Pilotos.
import ServicoAerovia from "./ServicoAerovia.js"; // Importa o serviço responsável por gerenciar Aerovias.
import ServicoAeronave from "./ServicoAeronave.js"; // Importa o serviço responsável por gerenciar Aeronaves.
import { validate } from "bycontract"; // Importa uma função de validação de contratos.
import AeronavePassageiro from "./AeronavePassageiro.js"; // Importa a classe AeronavePassageiro.
import Aerovias from "./Aerovias.js"; // Importa a classe Aerovias.
import promptsync from "prompt-sync"; // Importa a biblioteca para capturar entradas do usuário via prompt.
const prompt = promptsync({ sigint: true }); // Cria uma instância da biblioteca para capturar entradas do usuário.
import { createRequire } from "module"; // Importa a função createRequire para uso do sistema de módulos CommonJS.
import * as fp from "./FunctionsProjeto.js"; // Importa todas as funções do arquivo FunctionsProjeto.js como um objeto fp.
import Altitudes from "./Altitudes.js"; // Importa a classe Altitudes.
import PlanoVoo from "./PlanoVoo.js"; // Importa a classe PlanoVoo.
import ServicoPlanos from "./ServicoPlanos.js"; // Importa o serviço responsável por gerenciar Planos de Voo.
import OcupacaoAerovia from "./OcupacaoAerovia.js"; // Importa a classe OcupacaoAerovia.
const require = createRequire(import.meta.url); // Cria uma instância de require para usar módulos CommonJS.

console.log(
  "Selecione uma opção:\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
); // Exibe o menu de opções.
let option = Number(prompt("Opção: ")); // Captura a opção inicial do usuário.
while (
  option != 1 &&
  option != 2 &&
  option != 3 &&
  option != 4 &&
  option != 0
) {
  // Loop para garantir que a entrada seja uma opção válida.
  console.log(
    "Selecione uma opção válida!\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
  ); // Exibe o menu novamente se a opção for inválida.
  option = Number(prompt("Opção:")); // Captura a nova entrada.
}

while (option != 0) {
  // Loop principal que continua até o usuário escolher a opção de sair (0).
  switch (
    option // Switch para lidar com cada opção do menu.
  ) {
    case 1: // Opção 1 - Verificar Aerovias
      let a1 = prompt("Digite o primeiro aeroporto que deseja verificar: "); // Captura o primeiro aeroporto.
      let a2 = prompt("Digite o segundo aeroporto que deseja verificar: "); // Captura o segundo aeroporto.
      console.log(`As aerovias entre ${a1} e ${a2} são:`); // Exibe os aeroportos escolhidos.
      console.log(ServicoAerovia.entreAeroportos(a1, a2)); // Chama a função que retorna aerovias entre os aeroportos.
      console.log(
        "Deseja realizar outra operação?\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
      ); // Exibe o menu novamente após a operação.
      option = Number(prompt("Opção: ")); // Captura a nova opção.
      while (
        option != 1 &&
        option != 2 &&
        option != 3 &&
        option != 4 &&
        option != 0
      ) {
        // Valida a entrada novamente.
        console.log(
          "Selecione uma opção válida!\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
        ); // Exibe o menu de opções.
        option = Number(prompt("Opção:")); // Captura a nova entrada.
      }
      break; // Encerra o case 1.
    case 2: // Opção 2 - Altitudes Livres
      console.log(
        "Deseja buscar pelo horário ou por um slot de horário específico?\n1-Horário\n2-Slot\n0-Sair"
      ); // Pergunta se o usuário quer buscar por horário ou por slot.
      option = Number(prompt("Opção: ")); // Captura a opção.
      while (option != 1 && option != 2 && option != 0) {
        // Valida a entrada.
        console.log("Selecione uma opção válida!\n1-Horário\n2-Slot\n0-Sair"); // Exibe o menu de opções.
        option = Number(prompt("Opção:")); // Captura a nova entrada.
      }
      if (option === 1) {
        // Se a opção for 1, busca pelo horário.
        let altitudes = Altitudes.altitudes(); // Chama a função que retorna altitudes.
        let day = Number(prompt("Digite o dia desejado: ")); // Captura o dia.
        let year = Number(prompt("Digite o ano desejado: ")); // Captura o ano.
        let month = Number(prompt("Digite o mês desejado: ")); // Captura o mês.
        let hour = Number(prompt("Digite a hora desejada: ")); // Captura a hora.
        let minute = Number(prompt("Digite o minuto desejado: ")); // Captura o minuto.
        let aeroviaId = Number(prompt("Digite o id da aerovia: ")); // Captura o ID da aerovia.
        let aeronavePrefixo = prompt(
          "Digite o prefixo da nave que será utilizada: "
        ); // Captura o prefixo da aeronave.
        console.log(
          "Essas são as altitudes livres para o horário selecionado: "
        ); // Exibe uma mensagem.
        console.log(
          fp.altitudesLivres(
            altitudes,
            day,
            year,
            month,
            hour,
            minute,
            aeroviaId,
            aeronavePrefixo
          )
        ); // Chama a função para buscar altitudes livres e exibe o resultado.
      } else if (option === 2) {
        // Se a opção for 2, busca por slots de horário.
        let converter = prompt(
          "Digite os números dos slots de horário de 0 a 23 que deseja veificar separando-os por virgula: "
        ); // Captura os slots de horário.
        let numerosAConverter = converter.split(","); // Converte a string de entrada em um array.
        let jsonTest = {}; // Inicializa um objeto JSON vazio.
        for (let n of numerosAConverter) {
          // Itera pelos números de slots.
          let nNumber = Number(n); // Converte o slot para número.
          let jsonAlt = {
            [n]: fp.altitudesLivres2(
              Altitudes.altitudes(),
              day,
              year,
              month,
              nNumber
            ),
          }; // Cria um JSON com o slot como chave e o resultado da função como valor.
          jsonTest = { ...jsonTest, ...jsonAlt }; // Mescla o novo JSON com o resultado existente.
        }
        console.log(
          "Essas são as altitudes livres para os slots selecionados: "
        ); // Exibe uma mensagem.
        console.log(jsonTest); // Exibe o resultado final.
      }
      console.log(
        "Deseja realizar outra operação?\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
      ); // Exibe o menu novamente após a operação.
      option = Number(prompt("Opção: ")); // Captura a nova opção.
      while (
        option != 1 &&
        option != 2 &&
        option != 3 &&
        option != 4 &&
        option != 0
      ) {
        // Valida a entrada novamente.
        console.log(
          "Selecione uma opção válida!\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
        ); // Exibe o menu de opções.
        option = Number(prompt("Opção:")); // Captura a nova entrada.
      }
      break; // Encerra o case 2.
    case 3: // Opção 3 - Submeter Plano de Voo
      let matricula = Number(prompt("Digite a matricula do piloto: ")); // Captura a matrícula do piloto.
      let prefixo = prompt("Digite o prefixo da aeronave: "); // Captura o prefixo da aeronave.
      let aeroviaUtilizada = Number(
        prompt("Digite a aerovia que será utilizada: ")
      ); // Captura a aerovia utilizada.
      let altitude = Number(prompt("Digite a altitude: ")); // Captura a altitude.
      let hora = Number(prompt("Digite a hora: ")); // Captura a hora.
      let minuto = Number(prompt("Digite o minuto: ")); // Captura o minuto.
      console.log("Submetendo plano..."); // Exibe uma mensagem de status.
      ServicoPlanos.criarPlano(
        matricula,
        prefixo,
        aeroviaUtilizada,
        altitude,
        hora,
        minuto
      ); // Submete o plano de voo.
      console.log("Plano submetido com sucesso."); // Confirma o sucesso da operação.
      console.log(
        "Deseja realizar outra operação?\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
      ); // Exibe o menu novamente após a operação.
      option = Number(prompt("Opção: ")); // Captura a nova opção.
      while (
        option != 1 &&
        option != 2 &&
        option != 3 &&
        option != 4 &&
        option != 0
      ) {
        // Valida a entrada novamente.
        console.log(
          "Selecione uma opção válida!\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
        ); // Exibe o menu de opções.
        option = Number(prompt("Opção:")); // Captura a nova entrada.
      }
      break; // Encerra o case 3.
    case 4: // Opção 4 - Verificar Plano de Voo
      let id = prompt("Digite o id do plano que deseja verificar: "); // Captura o ID do plano.
      console.log(ServicoPlanos.verificarPlano(id)); // Chama a função que verifica o plano e exibe o resultado.
      console.log(
        "Deseja realizar outra operação?\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
      ); // Exibe o menu novamente após a operação.
      option = Number(prompt("Opção: ")); // Captura a nova opção.
      while (
        option != 1 &&
        option != 2 &&
        option != 3 &&
        option != 4 &&
        option != 0
      ) {
        // Valida a entrada novamente.
        console.log(
          "Selecione uma opção válida!\n1-Verificar Aerovias\n2-Altitudes Livres\n3-Submeter Plano de Voo\n4-Verificar Plano de Voo\n0-Sair"
        ); // Exibe o menu de opções.
        option = Number(prompt("Opção:")); // Captura a nova entrada.
      }
      break; // Encerra o case 4.
  }
}
