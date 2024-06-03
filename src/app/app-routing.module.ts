import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { Role } from "./core/models/role";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { LeaseComponent } from "./lease/pages/lease/lease.component";
import { AddRolesComponent } from "./admin/roles/add-roles/add-roles.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
     
      {
        path: "admin",
        canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
      },
      
      {
        path: "rent",
        canActivate: [AuthGuard],
        data: {
          role: Role.agent,
        },
        loadChildren: () =>
          import("./rent/rent.module").then((m)=>m.RentModule),
      },
   

      {
        path: "property",
        canActivate: [AuthGuard],
        data: {
          roles: [Role.landlord, Role.agent],
        },
        loadChildren: () =>
          import("./property/property.module").then((m) => m.PropertyModule),
      },
      {
        path: "tenants",
        canActivate: [AuthGuard],
        data: {
          roles: [Role.landlord, Role.agent],
        },
        loadChildren: () =>
          import("./tenants/tenants.module").then((m) => m.TenantsModule),
      },
      {
        path: "leasing",
        canActivate: [AuthGuard],
        data: {
          roles: [Role.landlord, Role.agent],
        },
        loadChildren: () =>
          import("./lease/lease.module").then((m) => m.LeaseModule),
      },
      {
        path: "propertyConfiguration",
        canActivate: [AuthGuard],
        data: {
          roles: [Role.landlord, Role.agent],
        },
        loadChildren: () =>
          import("./configuration/configuration.module").then((m)=>m.ConfigurationModule),
      },
      {
        path: "billing",
        canActivate: [AuthGuard],
        data: {
          roles: [Role.landlord, Role.agent],
        },
        loadChildren: () =>
          import("./billing/billing.module").then((m)=>m.BillingModule),
      },
    ],
  },


  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
