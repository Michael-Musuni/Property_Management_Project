import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantManagementComponent } from './pages/tenant-management/tenant-management.component';
import { AddTenantComponent } from './pages/add-tenant/add-tenant.component';
import { PropertyUnitComponent } from './pages/property-unit/property-unit.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';


const routes: Routes = [
  {
    path: "manage",
   component: TenantManagementComponent
  },
  {
    path: "add",
   component: AddTenantComponent
  },
  {
    path: "unit",
   component: PropertyUnitComponent
  },
  {
    path: "details",
   component: PropertyDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
