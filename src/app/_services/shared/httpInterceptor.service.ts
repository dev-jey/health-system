import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {
    Router
  } from "@angular/router";
  import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  token: string;
  constructor(private auth: AuthenticationService, private alert: AlertService, private router: Router ) {
  }
  handleError(err: HttpErrorResponse) {
    if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
            this.router.navigateByUrl('/error/timeout');
        }
        if(err.status === 403){
            this.router.navigateByUrl('/error/unauthorized');
        }
        if(err.status === 500){
            this.router.navigateByUrl('/error/500');
        }
    }
    return throwError(err);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser: any = localStorage.getItem('mediclaimUserToken');
    if (currentUser) {
      this.token = currentUser;
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.token) });
    }
    return next.handle(request).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}