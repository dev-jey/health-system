import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HttpInterceptorService } from './_services/shared/httpInterceptor.service';
import { SlaModule } from './sla/sla.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    AuthenticationModule,
    NgbModule,
    SlaModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, PageNotFoundComponent ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
