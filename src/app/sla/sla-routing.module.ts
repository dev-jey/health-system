import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "../_services/authentication/auth.guard";
import { GenerateMvcComponent } from './generate-mvc/generate-mvc.component';
import { MvcListComponent } from './mvc-list/mvc-list.component';
import { ContractsComponent } from './contracts/contracts.component';
import { SchemeRulesComponent } from './scheme-rules/scheme-rules.component';
import { ClaimPreauthCreateLayoutComponent } from './claim-preauth-create-layout/claim-preauth-create-layout.component';
import { ClaimPreauthListLayoutComponent } from './claim-preauth-list-layout/claim-preauth-list-layout.component';


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
    children: [{ path: "", component: ClaimPreauthCreateLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "create/preauth/:mvc",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ClaimPreauthCreateLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "view/preauth",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ClaimPreauthListLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "view/claim",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ClaimPreauthListLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "view/preauth/:id",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ClaimPreauthCreateLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "view/claim/:id",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ClaimPreauthCreateLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "edit/preauth/:id",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ClaimPreauthCreateLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "edit/claim/:id",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ClaimPreauthCreateLayoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "contracts",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ContractsComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "scheme-rules",
    component: AdminLayoutComponent,
    children: [{ path: "", component: SchemeRulesComponent }],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlaRoutingModule {}
