import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteProtectService implements CanActivate{

  constructor(
    private router: Router) { }

    canActivate() {
      const currentUser = localStorage.getItem('mediclaimUser');
      if (currentUser) {
          return true;
      }
      this.router.navigateByUrl("/");
      return false;
  }
}