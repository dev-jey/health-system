import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "../_services/auth.guard";
import { GenerateMvcComponent } from './generate-mvc/generate-mvc.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlaRoutingModule {}
