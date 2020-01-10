import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpService } from "../shared/http.service";
import { Router } from "@angular/router";
import { UserAunthentication } from "../../_models/authentication/UserAunthentication";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpService, private router: Router) {}

  /**
   * User login
   * @param data
   */
  authenticateUser(data: UserAunthentication) {
    return this.http.makeMediclaimRequest("user/signin", "POST", data);
  }

  /**
   * Get authenticated user
   */
  getAuthenticatedUser() {
    return this.http.makeMediclaimRequest("user/show", "GET");
  }

  /**
   * Logout user
   */
  public logout() {
    localStorage.removeItem("mediclaimUserToken");
    localStorage.removeItem("mediclaimUser");
    this.router.navigate([""]);
  }
}
