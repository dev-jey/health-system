import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

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
    path:"**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
