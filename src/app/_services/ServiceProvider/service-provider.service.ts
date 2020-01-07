import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from "../shared/http.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor(private http: HttpService) { }

  searchMember(memberData: String): Observable<any> {
    return this.http.makeMediclaimRequest('payment/mcc/findpatientdetails', 'POST', { ...memberData });
  }

  getDepartments(): Observable<any> {
    return this.http.makeMediclaimRequest('departments', 'GET');
  }

  validateOTP(mobileNo: string, otp: string): Observable<any> {
    return this.http.makeMediclaimRequest(`otp/${mobileNo}/${otp}/verifyotp`, 'GET');
  }

  resendOTP(mobileNo: string): Observable<any> {
    return this.http.makeMediclaimRequest(`otp/${mobileNo}/resendotp`, 'GET');
  }

  generateOTP(mobileNo: string, dsend: string): Observable<any> {
    return this.http.makeMediclaimRequest(`otp/${mobileNo}/sendotp/${dsend}`, 'GET');
  }

  createMVC(details: object): Observable<any> {
    return this.http.makeMediclaimRequest(`payment/mcc/create`, 'POST', { ...details });
  }
  recordFingerprint(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`enroll/biometric`, 'POST', payload);
  }
  getMvcList(payload): Observable<any> {
    return this.http.makeMediclaimRequest('search/mcc', 'POST', payload)
  }
  getPreauthDetails(mvc): Observable<any> {
    return this.http.makeMediclaimRequest(`payment/mcc/${mvc}`, 'GET');
  }
}
