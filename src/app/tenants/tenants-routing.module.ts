import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantManagementComponent } from './pages/tenant-management/tenant-management.component';
import { AddTenantComponent } from './pages/add-tenant/add-tenant.component';

const routes: Routes = [
  {
    path: "manage",
   component: TenantManagementComponent
  },
  {
    path: "add",
   component: AddTenantComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
