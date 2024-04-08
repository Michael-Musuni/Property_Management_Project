import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentsComponent } from './pages/rents/rents.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { TenantManagementComponent } from '../tenants/pages/tenant-management/tenant-management.component';
import { PropertyManagementComponent } from '../property/pages/property-management/property-management.component';
import { MainBillingComponent } from './pages/mainbilling/mainbilling.component';

const routes: Routes = [
  {
    path:"main",
    component:MainBillingComponent
  },
  {
    path:"rents",
    component:RentsComponent
  },
  {
    path:"invoices",
    component:InvoicesComponent
  },

  {
    path:"expenses",
    component:ExpensesComponent
  },

  { 
    path: 'tenants/manage', component: TenantManagementComponent 
  },
  { 
    path: 'property/main', component: PropertyManagementComponent
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
