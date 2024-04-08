import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertydashboardComponent } from './propertydashboard/propertydashboard.component';


const routes: Routes = [
  {
    path: "dashboard",
   component: PropertydashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDashboardRoutingModule { }
