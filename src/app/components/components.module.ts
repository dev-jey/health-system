import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ErrorSessionTimeoutComponent } from './shared/error-session-timeout/error-session-timeout.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { InternalServerErrorComponent } from './shared/internal-server-error/internal-server-error.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, FormsModule, ReactiveFormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, ErrorSessionTimeoutComponent, AdminLayoutComponent, LoaderComponent, InternalServerErrorComponent, ContactComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, AdminLayoutComponent, LoaderComponent]
})
export class ComponentsModule { }
