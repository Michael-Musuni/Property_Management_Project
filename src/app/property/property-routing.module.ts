import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyManagementComponent } from './pages/property-management/property-management.component';
import { AddpropertyComponent } from './pages/addproperty/addproperty.component';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./property-dashboard/property-dashboard.module").then((m)=>m.PropertyDashboardModule)
  },
  {
    path: "main",
   component: MainComponent
  },
  {
    path: "manage",
   component: PropertyManagementComponent
  },
  {
    path: "create",
   component: AddpropertyComponent
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule { }
