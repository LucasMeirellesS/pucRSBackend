import PlanoVoo from "./PlanoVoo.js";
import * as fp from "./FunctionsProjeto.js";
import Altitudes from "./Altitudes.js";
import ServicoAerovia from "./ServicoAerovia.js";
import ServicoPlanos from "./ServicoPlanos.js";
class OcupacaoAerovia {
  static altitudesLivres(aeroviaId, year, month, day, hour, minute) {
    let altitudesDisponiveis = [];
    let dt = fp.mkDatetime(year, month, day, hour, minute);
    for (let a of ServicoAerovia.listaAerovia()) {
      if (a.dataHora.equals(dt) && a.aerovia === aeroviaId) {
        for (let alt of Altitudes.altitudes()) {
          if (alt != a.altitude) {
            altitudesDisponiveis.push(alt);
          }
        }
        if (altitudesDisponiveis.length === 0) {
          return "Não há altitudes disponíveis para essa aerovia nessa data e horário";
        } else {
          return altitudesDisponiveis;
        }
      }
    }
  }

  static isOcupad(horario, altitude, aeroviaId) {
    let hora = horario.toISOTime(); // Obtém a hora no formato ISO
    let data = horario.toISODate(); // Obtém a data no formato ISO

    if (ServicoPlanos.listaPlanos().length > 0) {
      for (let pl of ServicoPlanos.listaPlanos()) {
        // Verifica se pl.horario e pl.data estão definidos corretamente
        if (
          pl.horario === hora &&
          pl.data === data &&
          pl.altitude === altitude &&
          pl.aerovia === aeroviaId
        ) {
          return true; // Retorna true se o horário e a aerovia já estiverem cadastrados
        }
      }
    }
    return false; // Retorna false se não houver conflito
  }
}
export default OcupacaoAerovia;
