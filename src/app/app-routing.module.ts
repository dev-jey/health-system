import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ErrorSessionTimeoutComponent } from './components/shared/error-session-timeout/error-session-timeout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './_services/authentication/auth.guard';
import { InternalServerErrorComponent } from './components/shared/internal-server-error/internal-server-error.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "sla",
    loadChildren: () => import("./sla/sla.module").then(m => m.SlaModule)
  },
  {
    path: "error/timeout",
    component: AdminLayoutComponent,
    children: [{ path: "", component: ErrorSessionTimeoutComponent }],
    canActivate: [AuthGuard]
  },
  {
    path: "error/500",
    component: InternalServerErrorComponent
  },
  {
    path: "**",
    component: AdminLayoutComponent,
    children: [{ path: "", component: PageNotFoundComponent }],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
