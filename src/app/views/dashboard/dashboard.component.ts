import { Component, OnInit } from "@angular/core";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { Router } from "@angular/router";

import { Weapon } from "../../shared/models/weapon";
import { DataServiceService } from "../../shared/services/data-service.service";

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  weapons = [];
  weapons_ = [];
  search;
  constructor(private router: Router, private dataService: DataServiceService) {
    this.weapons = this.dataService.getWeapons();
    this.weapons_ = this.dataService.getWeapons();
  }

  radioModel: string = "Month";
  types = [
    "SMG",
    "AR",
    "LMG",
    "DMR",
    "SNIPER",
    "SHOTGUN",
    "RIFLE",
    "PISTOL",
    "REVOLVER",
  ];
  // lineChart1

  ngOnInit(): void {}

  weaponDetail(item) {
    this.router.navigateByUrl("dashboard/detail/" + item.name);
  }

  weaponImage(item: Weapon) {
    return "../../../assets/img/weapons/" + item.name + ".png";
  }

  sort(type) {
    this.weapons = this.weapons_.filter((obj) => obj.weaponClass === type);
  }

  searchValue(event) {
    this.weapons = this.weapons_.filter((obj) =>
      obj.name.trim().toLowerCase().includes(this.search.trim().toLowerCase())
    );
  }
}
