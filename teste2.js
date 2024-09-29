import Aeronave from "./Aeronave.js";
import AeronaveCarga from "./AeronaveCarga.js";
import AeronaveComercial from "./AeronaveComercial.js";
import AeronaveParticular from "./AeronaveParticular.js";
import AeronavePassageiro from "./AeronavePassageiro.js";
import Aerovias from "./Aerovias.js";
import OcupacaoAerovia from "./OcupacaoAerovia.js";
import Piloto from "./Piloto.js";
import PlanoVoo from "./PlanoVoo.js";
import ServicoAeronave from "./ServicoAeronave.js";
import ServicoAerovias from "./ServicoAerovia.js";
import ServicoPiloto from "./ServicoPiloto.js";
import Altitudes from "./Altitudes.js";
import ServicoPlanos from "./ServicoPlanos.js";
import * as fp from "./FunctionsProjeto.js";

// let r2 = new Aerovias("Baixa Da Egua", "Casa do Caralho", 100000);
// ServicoAerovias.addAerovia(r2);

// console.log(r2.toJSON());
// console.log(ServicoAerovias.listaAerovia());

// let p = new Piloto("155312", "Ronaldo", true);
// ServicoPiloto.addPiloto(p);

// console.log(p.toJSON());
// console.log(ServicoPiloto.listaPiloto());

let matricula = "111230";
let prefixo = "PT-PAS1";
let aerovia = 1;
let altitude = 29000;
let year = 2024;
let month = 2;
let day = 20;
let hour = 18;
let minute = 15;
let pl = new PlanoVoo(
  matricula,
  prefixo,
  aerovia,
  altitude,
  year,
  month,
  day,
  hour,
  minute
);
// OcupacaoAerovia.isOcupad(25000, 1, 2024, 2, 20, 15, 0)OcupacaoAerovia.isOcupad(25000, 1, 2024, 2, 20, 15, 0)
// console.log(pl.toJSON());
// let dt = fp.mkDatetime(year, month, day, hour, minute);
// console.log(
//   fp.slotsHorarios(altitude, year, month, day, hour, minute, aerovia, prefixo)
// );

// console.log(
//   `As altitudes livres no horário de ${dt.toISOTime()} e na data ${dt.toISODate()} são: ${livres}`
// );
// let tipo = fp.verificaAeronave("PT-CAR1");

// console.log(fp.validaAeronave(tipo, 27000, 0, 59));

// let aeronave1 = new Aeronave("asdasda", 5000, 5000);
// ServicoAeronave.addAeronaves(aeronave1);
// let aeronave2 = new AeronaveCarga("qweqwe", 5000, 5000, "Alguma", 50000);
// ServicoAeronave.addAeronaves(aeronave2);
// let aeronave3 = new AeronaveComercial("asdasdas", 5000, 5000, "Addsasd");
// ServicoAeronave.addAeronaves(aeronave3);
// let aeronave4 = new AeronaveParticular(
//   "Alguma",
//   "aushduasd",
//   5000,
//   5000,
//   "ALUGMA"
// );
// ServicoAeronave.addAeronaves(aeronave4);
// let aeronave5 = new AeronavePassageiro(
//   "ushduashduas",
//   5000,
//   5000,
//   "sandjasd",
//   500
// );
// ServicoAeronave.addAeronaves(aeronave5);

// console.log(ServicoAeronave.listaAeronaves());

console.log(
  fp.validaPlanoVoo(
    matricula,
    prefixo,
    aerovia,
    altitude,
    year,
    month,
    day,
    hour,
    minute
  )
);

// fp.slotsHorarios(altitude, year, month, day, hour, minute, aerovia, prefixo);
// fp.validaSlot2(altitude, year, month, day, hour, minute, aerovia, prefixo);
// console.log(fp.retornaSlotsAltitude(altitude, day, year, month));
console.log(ServicoAerovias.entreAeroportos("FLO", "CWB"));

console.log(
  fp.altitudesLivres(
    Altitudes.altitudes(),
    day,
    year,
    month,
    hour,
    minute,
    aerovia,
    prefixo
  )
);

let listNumberString = "16";
// let numerosAConverter = converter.split(",");
// let jsonTest = {};
// for (let n of numerosAConverter) {
//   let nNumber = Number(n);
//   let jsonAlt = {
//     [n]: fp.altitudesLivres2(Altitudes.altitudes(), day, year, month, nNumber),
//   };
//   jsonTest = { ...jsonTest, ...jsonAlt };
// }

// console.log(jsonTest);

// console.log(fp.altitudesLivres2(Altitudes.altitudes(), day, year, month, 18));

console.log(fp.convertStringNumber(listNumberString));
