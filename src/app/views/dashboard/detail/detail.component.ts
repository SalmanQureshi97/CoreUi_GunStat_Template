import { Component, OnInit } from "@angular/core";
import { Weapon } from "../../../shared/models/weapon";
import { DataServiceService } from "../../../shared/services/data-service.service";
import { ActivatedRoute } from "@angular/router";
import { Attachment } from "../../../shared/models/attachment";
import { Renderer2 } from "@angular/core";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  times = [1, 1, 1, 1, 1];
  ammo = [];
  sights = [];
  barrel = [];
  under = [];

  zoomLevel;
  fireMode;
  magSize;
  rateOfFire;

  weapon: Weapon;
  firePower;
  accuracy;
  handling;
  range;

  buttonInActive = "btn btn-secondary";
  buttonActive = "btn btn-secondary outline-success";

  DownClass = "progress-bar bg-danger";
  UpClass = "progress-bar bg-success";

  fireClass = "progress-bar bg-danger";
  rangeClass = "progress-bar bg-danger";
  accuracyClass = "progress-bar bg-danger";
  handlingClass = "progress-bar bg-danger";

  fireSelected = false;
  sightSelected = false;
  accuracySelected = false;
  rangeSelected = false;

  FireStat = "0";
  AccuracyStat = "0";
  RangeStat = "0";
  HandlingStat = "0";

  FireTotal = 0;
  AccuracyTotal = 0;
  RangeTotal = 0;
  HandlingTotal = 0;

  newFireStat = "0";
  newAccuracyStat = "0";
  newRangeStat = "0%";
  newHandlingStat = "0";

  newFireWidth = "0";
  newAccuracyWidth = "0";
  newRangeWidth = "0%";
  newHandlingWidth = "0";
  FireWidth = "0";
  AccuracyWidth = "0";
  RangeWidth = "0%";
  HandlingWidth = "0";

  ammoAttachment: Attachment;
  sightAttachment: Attachment;
  underAttachment: Attachment;
  barrelAttachment: Attachment;

  loading = true;
  constructor(
    private dataService: DataServiceService,
    private route: ActivatedRoute,
    private render: Renderer2
  ) {}

  ngOnInit(): void {
    this.dataService.getWeaponDetails().subscribe(
      (data) => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");

          let weapon = new Weapon(
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
          );
          if (weapon.name === this.route.snapshot.params.weaponId) {
            this.weapon = weapon;

            this.zoomLevel = weapon.zoomLevel;
            this.magSize = weapon.magSize;
            this.fireMode = weapon.fireMode;
            this.rateOfFire = weapon.rateOfFire;

            this.firePower = this.weapon.firePower + "%";
            this.accuracy = this.weapon.accuracy + "%";
            this.range = this.weapon.range + "%";
            this.handling = this.weapon.handling + "%";

            this.FireTotal = this.weapon.firePower;
            this.AccuracyTotal = this.weapon.accuracy;
            this.RangeTotal = this.weapon.range;
            this.HandlingTotal = this.weapon.handling;

            this.FireStat = this.weapon.firePower + "%";
            this.AccuracyStat = this.weapon.accuracy + "%";
            this.RangeStat = this.weapon.range + "%";
            this.HandlingStat = this.weapon.handling + "%";

            this.FireWidth = this.weapon.firePower + "%";
            this.AccuracyWidth = this.weapon.accuracy + "%";
            this.RangeWidth = this.weapon.range + "%";
            this.HandlingWidth = this.weapon.handling + "%";
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.dataService.getWeaponAttachments().subscribe(
      (data) => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          let attach = new Attachment(
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
          );

          if (
            attach.weapon.split("\\")[0].trim() ===
            this.route.snapshot.params.weaponId.trim()
          ) {
            if (attach.type === "Ammo") {
              this.ammo.push(attach);
            }
            if (attach.type === "Barrel") {
              this.barrel.push(attach);
            }
            if (attach.type === "Sights") {
              this.sights.push(attach);
            }
            if (attach.type === "Underbarrel") {
              this.under.push(attach);
            }
          }
        }
        this.loading = false;
        console.log(this.ammo);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImageUrl(attach: Attachment) {
    // console.log(
    //   "../../../assets/img/attachments/" +
    //     attach.type +
    //     "/" +
    //     attach.name +
    //     ".png"
    // );
    if (attach.type === "Ammo") {
      return (
        "../../../assets/img/attachments/" +
        attach.type +
        "/" +
        attach.weapon +
        " " +
        attach.name +
        ".png"
      );
    } else {
      return (
        "../../../assets/img/attachments/" +
        attach.type +
        "/" +
        attach.name +
        ".png"
      );
    }
  }

  attachmentSelected(item: Attachment, event) {
    // console.log(event.target.classList, event.target.parentNode.classList);
    // if (event.target.classList.contains("btn")) {
    //   this.render.addClass(event.target, "btn-outline-primary");
    // } else if (event.target.parentNode.classList.contains("btn")) {
    //   this.render.addClass(event.target.parentNode, "btn-outline-primary");
    // }

    if (item.type === "Ammo") {
      if (this.ammoAttachment) {
        //this.RangeStat = parseInt(this.range) - this.ammoAttachment.range + "%";
        //this.RangeTotal = parseInt(this.range) - this.ammoAttachment.range;
        this.newRangeStat =
          parseInt(this.newRangeStat.split("%")[0]) -
          this.ammoAttachment.range +
          "%";

        // this.AccuracyStat =
        //   parseInt(this.accuracy) - this.ammoAttachment.accuracy + "%";
        // this.AccuracyTotal =
        //   parseInt(this.accuracy) - this.ammoAttachment.accuracy;
        this.newAccuracyStat =
          parseInt(this.newAccuracyStat.split("%")[0]) -
          this.ammoAttachment.accuracy +
          "%";

        // this.HandlingStat =
        //   parseInt(this.handling) - this.ammoAttachment.handling + "%";
        // this.HandlingTotal =
        //   parseInt(this.handling) - this.ammoAttachment.handling;
        this.newHandlingStat =
          parseInt(this.newHandlingStat.split("%")[0]) -
          this.ammoAttachment.handling +
          "%";

        // this.FireStat =
        //   parseInt(this.firePower) - this.ammoAttachment.firePower + "%";
        // this.FireTotal =
        //   parseInt(this.firePower) - this.ammoAttachment.firePower;
        this.newFireStat =
          parseInt(this.newFireStat.split("%")[0]) -
          this.ammoAttachment.firePower +
          "%";
      }
      this.ammoAttachment = item;
    }
    if (item.type === "Barrel") {
      if (this.barrelAttachment) {
        // this.RangeStat =
        //   parseInt(this.range) - this.barrelAttachment.range + "%";
        // this.RangeTotal = parseInt(this.range) - this.barrelAttachment.range;
        this.newRangeStat =
          parseInt(this.newRangeStat.split("%")[0]) -
          this.barrelAttachment.range +
          "%";

        // this.AccuracyStat =
        //   parseInt(this.accuracy) - this.barrelAttachment.accuracy + "%";
        // this.AccuracyTotal =
        //   parseInt(this.accuracy) - this.barrelAttachment.accuracy;
        this.newAccuracyStat =
          parseInt(this.newAccuracyStat.split("%")[0]) -
          this.barrelAttachment.accuracy +
          "%";

        // this.HandlingStat =
        //   parseInt(this.handling) - this.barrelAttachment.handling + "%";
        // this.HandlingTotal =
        //   parseInt(this.handling) - this.barrelAttachment.handling;
        this.newHandlingStat =
          parseInt(this.newHandlingStat.split("%")[0]) -
          this.barrelAttachment.handling +
          "%";

        // this.FireStat =
        //   parseInt(this.firePower) - this.barrelAttachment.firePower + "%";
        // this.FireTotal =
        //   parseInt(this.firePower) - this.barrelAttachment.firePower;
        this.newFireStat =
          parseInt(this.newFireStat.split("%")[0]) -
          this.barrelAttachment.firePower +
          "%";
      }

      this.barrelAttachment = item;
    }
    if (item.type === "Sights") {
      if (this.sightAttachment) {
        this.RangeStat =
          parseInt(this.range) - this.sightAttachment.range + "%";
        // this.RangeTotal = parseInt(this.range) - this.sightAttachment.range;
        this.newRangeStat =
          parseInt(this.newRangeStat.split("%")[0]) -
          this.sightAttachment.range +
          "%";

        this.AccuracyStat =
          parseInt(this.accuracy) - this.sightAttachment.accuracy + "%";
        // this.AccuracyTotal =
        //   parseInt(this.accuracy) - this.sightAttachment.accuracy;
        this.newAccuracyStat =
          parseInt(this.newAccuracyStat.split("%")[0]) -
          this.sightAttachment.accuracy +
          "%";

        this.HandlingStat =
          parseInt(this.handling) - this.sightAttachment.handling + "%";
        // this.HandlingTotal =
        //   parseInt(this.handling) - this.sightAttachment.handling;
        this.newHandlingStat =
          parseInt(this.newHandlingStat.split("%")[0]) -
          this.sightAttachment.handling +
          "%";

        this.FireStat =
          parseInt(this.firePower) - this.sightAttachment.firePower + "%";
        // this.FireTotal =
        //   parseInt(this.firePower) - this.sightAttachment.firePower;
        this.newFireStat =
          parseInt(this.newFireStat.split("%")[0]) -
          this.sightAttachment.firePower +
          "%";
      }

      this.sightAttachment = item;
    }
    if (item.type === "Underbarrel") {
      if (this.underAttachment) {
        this.RangeStat =
          parseInt(this.range) - this.underAttachment.range + "%";
        // this.RangeTotal = parseInt(this.range) - this.underAttachment.range;
        this.newRangeStat =
          parseInt(this.newRangeStat.split("%")[0]) -
          this.underAttachment.range +
          "%";

        this.AccuracyStat =
          parseInt(this.accuracy) - this.underAttachment.accuracy + "%";
        // this.AccuracyTotal =
        //   parseInt(this.accuracy) - this.underAttachment.accuracy;
        this.newAccuracyStat =
          parseInt(this.newAccuracyStat.split("%")[0]) -
          this.underAttachment.accuracy +
          "%";

        this.HandlingStat =
          parseInt(this.handling) - this.underAttachment.handling + "%";
        // this.HandlingTotal =
        //   parseInt(this.handling) - this.underAttachment.handling;
        this.newHandlingStat =
          parseInt(this.newHandlingStat.split("%")[0]) -
          this.underAttachment.handling +
          "%";

        this.FireStat =
          parseInt(this.firePower) - this.underAttachment.firePower + "%";
        // this.FireTotal =
        //   parseInt(this.firePower) - this.underAttachment.firePower;
        this.newFireStat =
          parseInt(this.newFireStat.split("%")[0]) -
          this.underAttachment.firePower +
          "%";
      }
      this.underAttachment = item;
    }

    this.newRangeStat =
      parseInt(this.newRangeStat.split("%")[0]) + item.range + "%";
    this.newAccuracyStat =
      parseInt(this.newAccuracyStat.split("%")[0]) + item.accuracy + "%";
    this.newHandlingStat =
      parseInt(this.newHandlingStat.split("%")[0]) + item.handling + "%";
    this.newFireStat =
      parseInt(this.newFireStat.split("%")[0]) + item.firePower + "%";

    this.newFireWidth =
      Math.abs(parseInt(this.newFireStat.split("%")[0])) + "%";
    this.newHandlingWidth =
      Math.abs(parseInt(this.newHandlingStat.split("%")[0])) + "%";
    this.newRangeWidth =
      Math.abs(parseInt(this.newRangeStat.split("%")[0])) + "%";
    this.newAccuracyWidth =
      Math.abs(parseInt(this.newAccuracyStat.split("%")[0])) + "%";

    if (parseInt(this.newFireStat.split("%")[0]) < 0) {
      this.FireWidth =
        parseInt(this.FireStat.split("%")[0]) +
        parseInt(this.newFireStat.split("%")[0]) * 2 +
        "%";
    }
    if (parseInt(this.newAccuracyStat.split("%")[0]) < 0) {
      this.AccuracyWidth =
        parseInt(this.AccuracyStat.split("%")[0]) +
        parseInt(this.newAccuracyStat.split("%")[0]) * 2 +
        "%";
    }
    if (parseInt(this.newRangeStat.split("%")[0]) < 0) {
      this.RangeWidth =
        parseInt(this.RangeStat.split("%")[0]) +
        parseInt(this.newRangeStat.split("%")[0]) * 2 +
        "%";
    }
    if (parseInt(this.newHandlingStat.split("%")[0]) < 0) {
      this.HandlingWidth =
        parseInt(this.HandlingStat.split("%")[0]) +
        parseInt(this.newHandlingStat.split("%")[0]) * 2 +
        "%";
    }

    if (parseInt(this.newFireStat.split("%")[0]) < 0) {
      this.fireClass = this.DownClass;
    } else {
      this.fireClass = this.UpClass;
    }
    if (parseInt(this.newHandlingStat.split("%")[0]) < 0) {
      this.handlingClass = this.DownClass;
    } else {
      this.handlingClass = this.UpClass;
    }
    if (parseInt(this.newAccuracyStat.split("%")[0]) < 0) {
      this.accuracyClass = this.DownClass;
    } else {
      this.accuracyClass = this.UpClass;
    }
    if (parseInt(this.newRangeStat.split("%")[0]) < 0) {
      this.rangeClass = this.DownClass;
    } else {
      this.rangeClass = this.UpClass;
    }

    this.rateOfFire = item.rateOfFire;
    this.zoomLevel = item.zoomLevel;
    this.fireMode = item.fireMode;
    this.magSize = item.magSize;
    console.log(item.zoomLevel);
  }

  getStat(str: string) {
    return str.split("%")[0];
  }
}
