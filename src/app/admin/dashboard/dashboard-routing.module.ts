import {MatStepperModule} from '@angular/material/stepper';
import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component:DashboardComponent
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
