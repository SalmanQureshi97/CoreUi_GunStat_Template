export class Weapon {
  weaponClass: String;
  name: String;
  firePower: number;
  accuracy: number;
  range: number;
  handling: number;
  rateOfFire: number;
  magSize: number;
  fireMode: String;
  zoomLevel: number;

  constructor(
    weaponClass: String,
    name: String,
    firePower: number,
    accuracy: number,
    range: number,
    handling: number,
    rateOfFire: number,
    magSize: number,
    fireMode: String,
    zoomLevel: number
  ) {
    this.accuracy = accuracy;
    this.weaponClass = weaponClass;
    this.fireMode = fireMode;
    this.firePower = firePower;
    this.magSize = magSize;
    this.handling = handling;
    this.rateOfFire = rateOfFire;
    this.range = range;
    this.name = name;
    this.zoomLevel = zoomLevel;
  }
}
