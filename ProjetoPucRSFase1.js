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

console.log("Selecione uma opção:\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair");
let option = Number(prompt("Opção: ")); // Captura a opção inicial do usuário.
while (option != 1 && option != 2 && option != 3 && option != 0) {
  console.log(
    "Selecione uma opção válida!\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair"
  );
  option = Number(prompt("Opção:"));
}
while (option != 0) {
  switch (option) {
    case 1: // Adicionar novo registro
      console.log("Adicionar:\n1-Piloto\n2-Aeronave\n3-Aerovia\n0-Nada");
      let option2 = Number(prompt("Opção:")); // Captura a escolha de adição.
      while (option2 != 1 && option2 != 2 && option2 != 3 && option2 != 0) {
        console.log(
          "Selecione uma opção válida!\n1-Piloto\n2-Aeronave\n3-Aerovia\n0-Nada"
        );
        option2 = Number(prompt("Opção:"));
      }
      while (option2 != 0) {
        if (option2 === 1) {
          // Adicionar Piloto
          let matricula = prompt("Digite a matrícula do Piloto: ");
          let nome = prompt("Digite o nome do Piloto: ");
          let habilitacao = Boolean(
            prompt(
              "A habilitação do piloto está válida? Digite 'true' ou 'false': "
            )
          );
          let piloto = new Piloto(matricula, nome, habilitacao);
          ServicoPiloto.addPiloto(piloto); // Adiciona o piloto ao serviço.
          console.log("Adicionar:\n1-Piloto\n2-Aeronave\n3-Aerovia\n0-Nada");
          option2 = Number(prompt("Opção:"));
        } else if (option2 === 2) {
          // Adicionar Aeronave
          let companhia;
          let aeronave;
          let prefixo = prompt("Digite o prefixo da aeronave: ");
          let v_cruzeiro = Number(
            prompt("Digite a velocidade de cruzeiro da aeronave: ")
          );
          let autonomia = Number(prompt("Digite a autonomia da aeronave: "));
          console.log(
            "Selecione o tipo de Aeronave:\nA-Carga\nB-Passageiros\nC-Particular"
          );
          let op = prompt("Opção: ");
          while (op != "A" && op != "B" && op != "C") {
            console.log(
              "Selecione uma opção válida!\nA-Carga\nB-Passageiros\nC-Particular"
            );
            op = prompt("Opção: ");
          }
          switch (op) {
            case "A": // Adicionar Aeronave de Carga
              companhia = prompt("Digite o nome da companhia: ");
              let carga = Number(
                prompt("Digite a capacidade de carga da aeronave: ")
              );

              aeronave = new AeronaveCarga(
                prefixo,
                v_cruzeiro,
                autonomia,
                companhia,
                carga
              );
              ServicoAeronave.addAeronaves(aeronave); // Adiciona a aeronave de carga ao serviço.
              break;

            case "B": // Adicionar Aeronave de Passageiros
              let passageiros = Number(
                prompt("Digite a capacidade de passageiros da aeronave: ")
              );
              companhia = prompt("Digite o nome da companhia: ");
              aeronave = new AeronavePassageiro(
                prefixo,
                v_cruzeiro,
                autonomia,
                companhia,
                passageiros
              );
              ServicoAeronave.addAeronaves(aeronave); // Adiciona a aeronave de passageiros ao serviço.
              break;

            case "C": // Adicionar Aeronave Particular
              let empresa = prompt("Digite o nome da empresa: ");
              companhia = prompt("Digite o nome da companhia: ");
              aeronave = new AeronaveParticular(
                empresa,
                prefixo,
                v_cruzeiro,
                autonomia,
                companhia
              );
              ServicoAeronave.addAeronaves(aeronave); // Adiciona a aeronave particular ao serviço.
              break;
          }
          console.log("Adicionar:\n1-Piloto\n2-Aeronave\n3-Aerovia\n0-Nada");
          option2 = Number(prompt("Opção:"));
        } else if (option2 === 3) {
          // Adicionar Aerovia
          let origem = prompt("Digite a origem da aerovia: ");
          let destino = prompt("Digite o destino da aerovia: ");
          let tamanho = Number(prompt("Digite o tamanho da aerovia: "));
          let aerovia = new Aerovias(origem, destino, tamanho);
          ServicoAerovia.addAerovia(aerovia); // Adiciona a aerovia ao serviço.
          console.log("Adicionar:\n1-Piloto\n2-Aeronave\n3-Aerovia\n0-Nada");
          option2 = Number(prompt("Opção:"));
        }
      }
      console.log(
        "Deseja realizar outra operação?\nDigite\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair"
      );
      option = Number(prompt("Opção: "));
      while (option != 1 && option != 2 && option != 3 && option != 0) {
        console.log(
          "Selecione uma opção válida!\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair"
        );
        option = Number(prompt("Opção:"));
      }
      break;

    case 2: // Listar registros
      console.log("Pilotos");
      console.log(ServicoPiloto.listaPiloto().map((p) => p.toJSON())); // Lista pilotos.
      console.log("------------------------------");
      console.log("\n");
      console.log("Aeronaves");
      console.log(ServicoAeronave.listaAeronaves().map((a) => a.toJSON())); // Lista aeronaves.
      console.log("------------------------------");
      console.log("\n");
      console.log("Aerovias");
      console.log(ServicoAerovia.listaAerovia().map((a) => a.toJSON())); // Lista aerovias.
      console.log("------------------------------");
      console.log("\n");
      console.log(
        "Deseja realizar outra operação?\nDigite\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair"
      );
      option = Number(prompt("Opção: "));
      while (option != 1 && option != 2 && option != 3 && option != 0) {
        console.log(
          "Selecione uma opção válida!\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair"
        );
        option = Number(prompt("Opção:"));
      }
      break;

    case 3: // Recuperar registros específicos
      console.log("Procurar por:\n1-Piloto\n2-Aeronave\n3-Aerovia\n0-Nada");
      let op2 = Number(prompt("Opção: "));
      while (op2 != 1 && op2 != 2 && op2 != 3 && op2 != 0) {
        console.log(
          "Selecione uma opção válida!\n1-Piloto\n2-Aeronave\n3-Aerovia\n0-Nada"
        );
        op2 = Number(prompt("Opção:"));
      }
      if (op2 === 1) {
        // Recuperar Piloto
        let m = prompt("Digite a matricula do piloto: ");
        console.log(ServicoPiloto.recupera(m));
      } else if (op2 === 2) {
        // Recuperar Aeronave
        let a = prompt("Digite o prefixo da aeronave: ");
        console.log(ServicoAeronave.recupera(a));
      } else if (op2 === 3) {
        // Recuperar Aerovia
        let ae = Number(prompt("Digite o id da aerovia: "));
        console.log(ServicoAerovia.recupera(ae));
      }
      console.log(
        "Deseja realizar outra operação?\nDigite\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair"
      );
      option = Number(prompt("Opção: "));
      while (option != 1 && option != 2 && option != 3 && option != 0) {
        console.log(
          "Selecione uma opção válida!\n1-Adicionar\n2-Listar\n3-Recuperar\n0-Sair"
        );
        option = Number(prompt("Opção:"));
      }
      break;
  }
}
