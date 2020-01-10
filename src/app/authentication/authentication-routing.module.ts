import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { UserLayoutComponent } from "../layouts/user-layout/user-layout.component";

const routes: Routes = [
  {
    path: "",
    component: UserLayoutComponent,
    children: [{ path: "", component: LoginComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {} 
