import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainconfigComponent } from './pages/mainconfig/mainconfig.component';
const routes: Routes = [
  {
    path:"property-config",
    component:MainconfigComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
