import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:"configurations",
  //   component:RentconfigurationsComponent
  // },
  // {
  //   path:"config",
  //   component:RentconfigComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
