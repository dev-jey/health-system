import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServiceProviderService } from '../../../_services/ServiceProvider/service-provider.service';
import { AlertService } from 'src/app/_services/shared/alert.service';


@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent implements OnInit {
  departmentForm: FormGroup;
  @Input() currentSchemeId;
  @Input() completeMVC;
  @Input() showBiometricPage;
  @Input() completedCapturing;
  @Input() currentMemberBiometric;
  @Input() allDepartments;
  @Input() departments;
  @Input() hospitalConfigs;
  @Input() member;
  @Output() showBiometric = new EventEmitter();
  @Output() createMVC = new EventEmitter();
  @Output() setDepartmentData = new EventEmitter();
  @Output() setNhifData = new EventEmitter();
  currentDepartment: any;
  verifyButtonText: String = 'Verify'
  subDepartments: any;
  deptSelected: boolean;
  loading: boolean;
  dsend: string;
  showOptForm: boolean;
  optValidated: boolean;
  clearSubDepartments: boolean;
  constructor(
    private fb: FormBuilder,
    private serviceProvider: ServiceProviderService,
    private alert: AlertService
  ) { }


  /**
   * Initialize search form
   */
  initForms() {
    this.departmentForm = this.fb.group({
      department_id: [null, Validators.required],
      sub_dept_id: [null, Validators.required],
      nhif_no: [null]
    })
  }

  /**
   * Set subdepartments on select department
   */
  onSelectDept = () => {
    this.clearSubDepartments = true;
    this.currentDepartment = this.departmentForm.value.department_id;
    this.allDepartments.forEach(dept => {
      if (dept.id === this.currentDepartment) {
        this.subDepartments = dept.sub_departments;
      }
    });

    if (this.currentDepartment === 6) {
      this.allDepartments.forEach(dept => {
        if (dept.name.toLowerCase() === 'inpatient') {
          this.subDepartments = dept.sub_departments
        }
      });
    }
  }

  /**
   * Set sub-department id on select sub-department
   */
  onSelectSubDept = () => {
    this.deptSelected = true;
    this.setDepartmentData.emit({
      department_id: this.currentDepartment,
      sub_department_id: this.departmentForm.value.sub_dept_id
    })
  };


  /**
   * Generate OTP
   */
  generateOTP = (mobileNo) => {
    this.loading = true;
    this.verifyButtonText = 'Generating OTP';
    this.dsend = 'false';
    if (!JSON.parse(localStorage.getItem('mediclaimUser')).bls_serviceprovider) {
      if (this.currentSchemeId === 3) // Dont send OTP for NCC Scheme
        this.dsend = 'true';
    }
    this.serviceProvider.generateOTP(mobileNo, this.dsend).subscribe((data) => {
      this.showOptForm = true;
      this.verifyButtonText = 'Verify';
      this.alert.fire('Success!', `OTP has been sent to ${mobileNo}. Kindly request customer to provide OTP for verification`, 'success')
    }, (error) => {
      this.alert.fire('Error!', 'OPT number has not been sent successfully. Please try again', 'error', false)
    })
  }

  /**
   * Validate a given OTP and create MVC for member
   */
  validateOTP = (form, mobileNo) => {
    const { otp_no } = form.value;
    this.loading = true;
    this.serviceProvider.validateOTP(mobileNo, otp_no).subscribe((data) => {
      this.loading = false;
      if (data === 0) {
        this.alert.fire('Error!', 'Error validating the OTP. The provided OTP does not exist in the system', 'error')
      } else {
        if (!this.hospitalConfigs.biometric) {
          this.createMVC.emit();
        } else {
          this.optValidated = true;
          this.alert.fire('Success!', 'Enroll biometric data to continue', 'success'
          ).then(() => this.showBiometric.emit())
        }
      }
    });
  };

  /**
   * Set nhif input on member's data
   */
  setNHIF = () => {
    this.setNhifData.emit({
      nhif: this.departmentForm.value.nhif_no
    })
  };

  /**
   * Resend OTP if not received by user
   */
  resendOTP = (mobileNo) => {
    this.loading = true;
    this.serviceProvider.resendOTP(mobileNo).subscribe((data) => {
      this.alert.fire('Success!', `OTP has been resent to ${mobileNo}. Kindly request customer to provide OTP for verification`
        , 'success');
    })
  }

  ngOnInit() {
    this.initForms();
  }

}
