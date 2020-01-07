import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { Router } from "@angular/router"

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


  constructor(private serviceProvider: ServiceProviderService, private router: Router) { }

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
    const { currentMember, currentMemberRelation, currentMemberBiometric, age, dateOfBirth } = data;
    this.currentMember = currentMember;
    this.age = age;
    this.dateOfBirth = dateOfBirth;
    this.currentMemberRelation = currentMemberRelation;
    this.currentMemberBiometric = currentMemberBiometric;

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
    this.memberMVCdata.member_no = this.currentMember.bls_member.member_id;
    this.memberMVCdata.service_provider_id = JSON.parse(localStorage.getItem('mediclaimUser')).bls_serviceprovider.id;
    this.memberMVCdata.user_id = this.currentMember.bls_member.user_id;
    this.memberMVCdata.hospital_id = this.currentMember.hospital;
    this.memberMVCdata.scheme_id = this.currentSchemeId.toString();
    this.memberMVCdata.member_no = this.currentMember.bls_member.member_id;
    return new Promise((resolve) => {
      this.serviceProvider.createMVC(this.memberMVCdata).subscribe(
        (data) => {
          if (data.error) {
            Swal.fire({
              title: 'MVC Exists!', text: 'MVC cannot be generated. Kindly contact 0730604000 for further assistance', icon: 'error'
            }).then(() => this.router.navigate(['sla/mcc']));
            resolve(false);
            return;
          }
          this.mcc_number = data.id;
          Swal.fire({
            title: 'Success!', text: `
        MVC Number ${this.mcc_number} has been generated for ${this.currentMember.first_name} 
       ${this.currentMember.last_name} in ${data.department.name} department 
       ${moment(data.created_at).format("DD/MM/YYYY")} at ${moment(data.created_at).format("h:mma")}
        `, icon: 'success'
          }).then(() => { this.completeMVC = true; });
          this.optValidated = true;
          resolve(true);
        }, (error) => {
          console.log(error)
          Swal.fire({
            title: 'Error!', text: 'MVC cannot be generated. Kindly contact 0730604000 for further assistance', icon: 'error'
          })
          resolve(false)
        })

    })
  }
}
