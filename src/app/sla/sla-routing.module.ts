import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "../_services/authentication/auth.guard";
import { GenerateMvcComponent } from './generate-mvc/generate-mvc.component';
import { MvcListComponent } from './mvc-list/mvc-list.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { CreatePreauthComponent } from './create-preauth/create-preauth.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: AdminLayoutComponent,
    children: [{ path: "", component: DashboardComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "mvc/generate",
    component: AdminLayoutComponent,
    children: [{ path: "", component: GenerateMvcComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "mvc/list",
    component: AdminLayoutComponent,
    children: [{ path: "", component: MvcListComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "create/claim/:mvc",
    component: AdminLayoutComponent,
    children: [{ path: "", component: CreateClaimComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "create/preauth/:mvc",
    component: AdminLayoutComponent,
    children: [{ path: "", component: CreatePreauthComponent }],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlaRoutingModule {}
