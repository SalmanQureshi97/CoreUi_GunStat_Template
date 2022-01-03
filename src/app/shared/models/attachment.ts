export class Attachment {
  id: number;
  type: String;
  name: String;
  firePower: number;
  accuracy: number;
  range: number;
  handling: number;
  rateOfFire: number;
  magSize: number;
  fireMode: String;
  zoomLevel: String;
  positives: String;
  negatives: String;
  weapon: String;

  constructor(
    id: number,
    type: String,
    name: String,
    firePower: number,
    accuracy: number,
    range: number,
    handling: number,
    rateOfFire: number,
    magSize: number,
    fireMode: String,
    zoomLevel: String,
    positives: String,
    negatives: String,
    weapon: String
  ) {
    this.accuracy = accuracy;
    this.positives = positives;
    this.negatives = negatives;
    this.weapon = weapon;
    this.id = id;
    this.type = type;
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
