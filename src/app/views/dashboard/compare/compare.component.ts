import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Weapon } from "../../../shared/models/weapon";
import { DataServiceService } from "../../../shared/services/data-service.service";

@Component({
  selector: "app-compare",
  templateUrl: "./compare.component.html",
  styleUrls: ["./compare.component.scss"],
})
export class CompareComponent implements OnInit {
  loading = true;
  guns = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  selected = 0;
  cardClass = "card text-white";
  comparisonStarted = false;
  weapons = [];
  weapons_ = [];
  selectedWeapons: Weapon[] = [];

  fireWidth;
  accuracyWidth;
  rangeWidth;
  handlingWidth;
  magSizeWidth;
  rateOfFireWidth;

  fireWidth_;
  accuracyWidth_;
  rangeWidth_;
  handlingWidth_;
  magSizeWidth_;
  rateOfFireWidth_;

  search;
  constructor(private router: Router, private dataService: DataServiceService) {
    this.weapons = this.dataService.getWeapons();
    this.weapons_ = this.weapons;
  }

  ngOnInit(): void {
    this.loading = false;
    ///////////////
    // this.comparisonStarted = true;
    // this.loading = false;
  }

  weaponSelected(item, event) {
    // console.log(item, event.target.checked);
    if (event.target.checked) {
      this.selected += 1;
      this.selectedWeapons.push(item);
    } else {
      this.selectedWeapons = this.selectedWeapons.filter(
        (obj) => obj.name != item.name
      );
    }
    if (this.selectedWeapons.length === 2) {
      this.rangeWidth_ = this.selectedWeapons[1].range + "%";
      this.accuracyWidth_ = this.selectedWeapons[1].accuracy + "%";
      this.fireWidth_ = this.selectedWeapons[1].firePower + "%";
      this.handlingWidth_ = this.selectedWeapons[1].handling + "%";

      this.magSizeWidth_ = this.selectedWeapons[1].magSize;
      this.rateOfFireWidth_ = this.selectedWeapons[1].rateOfFire;

      this.rangeWidth = this.selectedWeapons[0].range + "%";
      this.accuracyWidth = this.selectedWeapons[0].accuracy + "%";
      this.fireWidth = this.selectedWeapons[0].firePower + "%";
      this.handlingWidth = this.selectedWeapons[0].handling + "%";
      this.magSizeWidth = this.selectedWeapons[0].magSize;
      this.rateOfFireWidth = this.selectedWeapons[0].rateOfFire;

      this.loading = true;
      let self = this;
      setTimeout(function () {
        self.comparisonStarted = true;
        self.loading = false;
      }, 1000);
    } else {
      this.cardClass = "card text-white";
    }
  }

  getStat(item) {
    return item.split("%")[0];
  }

  weaponImage(item: Weapon) {
    return "../../../assets/img/weapons/" + item.name + ".png";
  }

  searchValue(event) {}
}
