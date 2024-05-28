import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaseformComponent } from './pages/leaseform/leaseform.component';
import { LeaseComponent } from './pages/lease/lease.component';

const routes: Routes = [
  {
    path:"lease",
    component:LeaseComponent
  },

  {
    path:"newcontract/:id",//leasing/newcontract
    component:LeaseformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule { }
