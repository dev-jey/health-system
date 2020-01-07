import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../_services/ServiceProvider/service-provider.service';
import * as moment from 'moment';
import { Router } from "@angular/router"
import { AlertService } from '../../_services/shared/alert.service';

@Component({
  selector: "app-generate-mvc",
  templateUrl: "./generate-mvc.component.html",
  styleUrls: ["./generate-mvc.component.scss"]
})
export class GenerateMvcComponent implements OnInit {

  member: any = {};
  dependents: Array<string> = [];
  age: any;
  schemes: Array<String> = []
  currentMemberRelation: string;
  memberRelation: String = null;
  loading: Boolean = false;
  currentMember: any = {};
  currentMemberBiometric: Array<String> = [];
  currentSchemeId: number = null;
  currentDepartment: number = null;
  scheme_departments: Array<String> = [];
  hospitalConfigs: any = {};
  objList: Array<any> = [];
  departments: Array<any> = [];
  allDepartments: Array<any> = [];
  subDepartments: Array<String> = [];
  deptSelected: Boolean = false;
  showOptForm: Boolean = false;
  dsend: string = "false";
  memberMVCdata: any = {};
  mcc_number: string = "";
  dateOfBirth: string;
  optValidated: boolean;
  completeMVC: boolean;
  showBiometricPage: Boolean;
  completedCapturing: boolean;
  fetching: boolean;


  constructor(
    public serviceProvider: ServiceProviderService,
    private router: Router,
    private alert: AlertService) { }

  ngOnInit() {
    if (localStorage.getItem('mediclaimUser')) {
      this.schemes = JSON.parse(localStorage.getItem("mediclaimUser")).bls_serviceprovider.hospital.scheme_hospital;
    }
  }

  /**
   * Set current Scheme from the search component
   */
  initScheme = (currentSchemeId) => {
    this.currentSchemeId = currentSchemeId;
  }

  /**
   * Set member/dependent details after selecting dependent
   */
  setDependentDetails = (data) => {
    const { currentMember, currentMemberRelation, currentMemberBiometric, dateOfBirth } = data;
    this.currentMember = currentMember;
    this.dateOfBirth = dateOfBirth;
    this.currentMemberRelation = currentMemberRelation;
    this.currentMemberBiometric = currentMemberBiometric;

  }

  /**
   * Set department data from authentication form
   */

  setDepartmentData = (data) => {
    const { department_id, sub_department_id } = data;
    this.memberMVCdata.department_id = department_id;
    this.memberMVCdata.sub_department_id = sub_department_id;
  }

  /**
   * Set nhif data if at all filled by user
   */
  setNhifData = (data) => {
    const { nhif } = data;
    this.memberMVCdata.nhif = nhif;
  }


  /**
   * Set Member information from the search component
   */
  setMemberDetails = (value) => {
    const { member, memberRelation, dateOfBirth, dependents, objList } = value;
    this.member = member;
    this.memberRelation = memberRelation;
    this.dateOfBirth = dateOfBirth;
    this.dependents = dependents;
    this.objList = objList;
  }

  /**
   * Set hospital configurations for current hospital
   * 
   */
  setHospitalConfigs = (values) => {
    const { allDepartments, hospitalConfigs, departments } = values;
    this.allDepartments = allDepartments;
    this.hospitalConfigs = hospitalConfigs;
    this.departments = departments;
  }
  /**
   * Hide Biometric page
   */
  hideBiometric() {
    this.showBiometricPage = false;
  }

  /**
   * Show biometric page
   */
  showBiometric() {
    this.showBiometricPage = true;
  }

  /**
   * Generate MVC only after biometric verification/ capturing
   */
  generateMVCAfterFP() {
    this.showBiometricPage = false;
    this.createMVC()
  }


  /**
   * Create MVC 
   */
  createMVC = () => {
    this.memberMVCdata = {
      ...this.memberMVCdata,
      member_no: this.currentMember.bls_member.member_id,
      service_provider_id: JSON.parse(localStorage.getItem('mediclaimUser')).bls_serviceprovider.id,
      user_id: this.currentMember.bls_member.user_id,
      hospital_id: this.currentMember.hospital,
      scheme_id: this.currentSchemeId.toString()
    }
    return new Promise((resolve) => {
      this.fetching = true;
      this.serviceProvider.createMVC(this.memberMVCdata).subscribe(
        (data) => {
          if (data.error) {
            this.alert.fire('MVC Exists!', 'MVC cannot be generated. Kindly contact 0730604000 for further assistance', 'error'
            ).then(
              () => {
                  this.router.navigate(['sla/mvc/list']);
              });
            this.fetching = false;
            resolve(false);
            return;
          }
          this.mcc_number = data.id;
          this.alert.fire('Success!', `
                              MVC Number ${this.mcc_number} has been generated for ${this.currentMember.first_name} 
                            ${this.currentMember.last_name} in ${data.department.name} department 
                            ${moment(data.created_at).format("DD/MM/YYYY")} at ${moment(data.created_at).format("h:mma")}
                            `, 'success').then(() => { this.completeMVC = true; });
          this.optValidated = true;
          this.fetching = false;
          resolve(true);
        }, (error) => {
          this.alert.fire('Error!', 'MVC cannot be generated. Kindly contact 0730604000 for further assistance', 'error');
          this.fetching = false;
          resolve(false)
        })

    })
  }
}
