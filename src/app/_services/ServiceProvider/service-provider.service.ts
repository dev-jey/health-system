import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpService } from "../shared/http.service";

@Injectable({
  providedIn: "root"
})
export class ServiceProviderService {
  constructor(private http: HttpService) {}

  downloadPdf(payload, _type): Observable<any> {
    return this.http.makeMediclaimRequest(
      _type === "claim" ? `claims/sla/${payload}` : `preauths/sla/${payload}`,
      "GET",
      null,
      "arraybuffer"
    );
  }

  searchMember(memberData: String): Observable<any> {
    return this.http.makeMediclaimRequest(
      "payment/mcc/findpatientdetails",
      "POST",
      { ...memberData }
    );
  }

  getDepartments(): Observable<any> {
    return this.http.makeMediclaimRequest("departments", "GET");
  }

  validateOTP(mobileNo: string, otp: string): Observable<any> {
    return this.http.makeMediclaimRequest(
      `otp/${mobileNo}/${otp}/verifyotp`,
      "GET"
    );
  }

  resendOTP(mobileNo: string): Observable<any> {
    return this.http.makeMediclaimRequest(`otp/${mobileNo}/resendotp`, "GET");
  }

  generateOTP(mobileNo: string, dsend: string): Observable<any> {
    return this.http.makeMediclaimRequest(
      `otp/${mobileNo}/sendotp/${dsend}`,
      "GET"
    );
  }

  createMVC(details: object): Observable<any> {
    return this.http.makeMediclaimRequest(`payment/mcc/create`, "POST", {
      ...details
    });
  }
  recordFingerprint(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`enroll/biometric`, "POST", payload);
  }
  getMvcList(payload): Observable<any> {
    return this.http.makeMediclaimRequest("search/mcc", "POST", payload);
  }
  getPreauthDetails(mvc): Observable<any> {
    return this.http.makeMediclaimRequest(`payment/mcc/${mvc}`, "GET");
  }
  getInvestigations(): Observable<any> {
    return this.http.makeMediclaimRequest(`investigations`, "GET");
  }
  getFile(id): Observable<any> {
    return this.http.makeMediclaimRequest(`mccfile/${id}`, "GET");
  }
  uploadFile(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`mccfile`, "POST", payload);
  }
  deleteFile(id): Observable<any> {
    return this.http.makeMediclaimRequest(`mccfile/${id}`, "DELETE");
  }
  addConsultation(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`consultation`, "POST", payload);
  }
  addDiagnosis(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`mccdiagnosis`, "POST", payload);
  }
  addInvestigation(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`mccinvestigation`, "POST", payload);
  }
  addPrescription(payload): Observable<any> {
    return this.http.makeMediclaimRequest("mccprescription", "POST", payload);
  }
  createPreauth(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`preauths`, "POST", payload);
  }
  editPreauth(id, payload): Observable<any> {
    return this.http.makeMediclaimRequest(`preauths/${id}`, "PUT", payload);
  }
  createClaim(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`claims`, "POST", payload);
  }
  editClaim(id, payload): Observable<any> {
    return this.http.makeMediclaimRequest(`claims/${id}`, "PUT", payload);
  }
  searchPreauths(payload): Observable<any> {
    return this.http.makeMediclaimRequest("preauths/search", "POST", payload);
  }
  searchClaims(payload): Observable<any> {
    return this.http.makeMediclaimRequest("claims/search", "POST", payload);
  }
  getSchemeRules(): Observable<any> {
    return this.http.makeMediclaimRequest("schemerules", "GET");
  }
  deleteSchemeRule(id): Observable<any> {
    return this.http.makeMediclaimRequest(`schemerules/${id}`, "DELETE");
  }
  getHospitalContracts(hospitalId): Observable<any> {
    return this.http.makeMediclaimRequest(
      `schemerules/hospitalcontract/sla/${hospitalId}`,
      "GET"
    );
  }
  getDashboardMvcData(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`dashboards/index`, "POST", payload);
  }
  getDashboardPreauthData(payload): Observable<any> {
    return this.http.makeMediclaimRequest(
      `dashboards/preauths`,
      "POST",
      payload
    );
  }
  getDashboardClaimData(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`dashboards/claims`, "POST", payload);
  }
  getDashboardsData(): Observable<any> {
    return this.http.makeMediclaimRequest(`dashboards`, "GET");
  }
  getSchemes(): Observable<any> {
    return this.http.makeMediclaimRequest("schemes", "GET");
  }
  getMemberHistory(payload): Observable<any> {
    return this.http.makeMediclaimRequest(
      "user_category/history",
      "POST",
      payload
    );
  }

  getUserType(): Observable<any> {
    return this.http.makeMediclaimRequest("grading/userTypes", "GET");
  }

  getGradingQuestionairre(userType, statusId): Observable<any> {
    return this.http.makeMediclaimRequest(
      `grading/questionnaire?grading_user_type_id=${userType}%20&status_id=${statusId}`,
      "GET"
    );
  }

  gradingResponse(payload): Observable<any> {
    return this.http.makeMediclaimRequest(`grading/response`, "POST", payload);
  }

  gerGradations(stakeholder_id): Observable<any> {
    return this.http.makeMediclaimRequest(
      `grading/points?stakeholder_id=${stakeholder_id}`,
      "GET"
    );
  }

  getSingleGradationITem(id): Observable<any> {
    return this.http.makeMediclaimRequest(
      `grading/point/comprehensive/id/${id}`,
      "GET"
    );
  }
}
