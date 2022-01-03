import { Component } from "@angular/core";
import { navItems } from "../../_nav";
import { Output, EventEmitter } from "@angular/core";
import { DataServiceService } from "../../shared/services/data-service.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  constructor() {}
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
