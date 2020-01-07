import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}
  /**
   *
   * @param path
   * @param method
   * @param body
   */
  makeMediclaimRequest(path: string, method: string, body?: any) {
    return this.http.request(
      method,
      `${environment.mediclaim_baseurl}${path}`,
      { headers: this.getMediclaimHeaders(), body: body }
    );
  }

  /**
   * Get mediclaim headers
   */
  private getMediclaimHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.mediclaimAuthorizationToken()}`
    });
  }

  /**
   * Get bearer wallet authorization key
   */
  private mediclaimAuthorizationToken() {
    const userData = localStorage.getItem("mediclaimUserToken");
    if (userData) {
      return userData;
    }
    return "";
  }
}
