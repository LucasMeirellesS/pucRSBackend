import { validate } from "bycontract";

class Altitudes {
  static #altitudes = [
    25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000,
  ];

  static altitudes() {
    return Altitudes.#altitudes;
  }

  static hasAltitude(altitude) {
    validate(altitude, "number");
    for (let a of Altitudes.#altitudes) {
      if (altitude === a) {
        return true;
      }
    }
    return false;
  }
}



export default Altitudes;
