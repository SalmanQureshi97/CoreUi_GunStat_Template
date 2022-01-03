import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompareComponent } from "./compare/compare.component";

import { DashboardComponent } from "./dashboard.component";
import { DetailComponent } from "./detail/detail.component";

const routes: Routes = [
  {
    path: "detail/:weaponId",
    component: DetailComponent,
    data: {
      title: "Weapon Stats",
    },
  },
  {
    path: "",
    component: DashboardComponent,
    data: {
      title: "Dashboard",
    },
  },
  {
    path: "compare",
    component: CompareComponent,
    data: {
      title: "Weapon Comparison",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class DashboardRoutingModule {}
