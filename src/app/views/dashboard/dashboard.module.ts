import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DetailComponent } from "./detail/detail.component";
import { CommonModule } from "@angular/common";
import { CompareComponent } from "./compare/compare.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DataServiceService } from "../../shared/services/data-service.service";

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ButtonsModule.forRoot(),
  ],
  declarations: [DashboardComponent, DetailComponent, CompareComponent],
  providers: [DataServiceService],
})
export class DashboardModule {}
