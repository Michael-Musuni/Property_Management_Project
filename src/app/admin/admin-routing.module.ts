import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddRolesComponent } from "./roles/add-roles/add-roles.component";
import { PrivelegeComponent } from "./privelege/privelege.component";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  { path: 'addRole', component: AddRolesComponent },
  { path: 'privelege', component: PrivelegeComponent },
  {
    path: "roles",
    loadChildren: () =>
      import("./roles/roles.module").then(
        (m) => m.RolesModule
      ),
  },

  {
    path: "users",
    loadChildren: () =>
      import("./users/users.module").then(
        (m) => m.UsersModule
      ),
  },


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminRoutingModule { }
