import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Attachment } from "../models/attachment";
import { Weapon } from "../models/weapon";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class DataServiceService {
  weapons = [];
  attachments = [];

  constructor(private http: HttpClient) {
    this.http
      .get("../../../assets/data/BattleFiew_weaponStats.csv", {
        responseType: "text",
      })
      .subscribe(
        (data) => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.weapons.push(
              new Weapon(
                row[0],
                row[1],
                parseFloat(row[2]),
                parseFloat(row[3]),
                parseFloat(row[4]),
                parseFloat(row[5]),
                parseFloat(row[6]),
                parseFloat(row[7]),
                row[8],
                parseFloat(row[9])
              )
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );

    this.http
      .get("../../../assets/data/BattleFiew_attachmentStats.csv", {
        responseType: "text",
      })
      .subscribe(
        (data) => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.attachments.push(
              new Attachment(
                parseInt(row[0]),
                row[1],
                row[2],
                parseFloat(row[3]),
                parseFloat(row[4]),
                parseFloat(row[5]),
                parseFloat(row[6]),
                parseFloat(row[7]),
                parseFloat(row[8]),
                row[9],
                row[10],
                row[11],
                row[12],
                row[13]
              )
            );
          }
          //  console.log(this.attachments);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getWeapons() {
    return this.weapons;
  }

  getWeaponDetails() {
    return this.http.get("../../../assets/data/BattleFiew_weaponStats.csv", {
      responseType: "text",
    });
  }

  getWeaponAttachments() {
    return this.http.get(
      "../../../assets/data/BattleFiew_attachmentStats.csv",
      {
        responseType: "text",
      }
    );
  }
}
