import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import * as moment from 'moment';
import { SortByDatePipe } from 'src/app/_pipes/sort-by-date.pipe';


@Component({
  selector: 'app-claim-preauth-list-layout',
  templateUrl: './claim-preauth-list-layout.component.html',
  styleUrls: ['./claim-preauth-list-layout.component.scss']
})
export class ClaimPreauthListLayoutComponent implements OnInit {
  _type: String;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  searchPreauthForm: FormGroup;
  searchParameters: any = {};
  mccData: Array<any>;
  loading: boolean;
  schemes: Array<any> = [];
  currentDepartment: number;
  allDepartments: any = [];
  subDepartments: any[];
  searchPreauthFormErrors = {
    required: 'Field is required'
  }
  searchPreauthFormSubmitted: boolean;
  fetching: boolean;
  status: Array<any> = [
    'Incomplete',
    'Pending',
    'Rejected',
    'Approved'
  ]

  constructor(private fb: FormBuilder, private alert: AlertService, private serviceProvider: ServiceProviderService, private sortByDate:SortByDatePipe) {

  }

  ngOnInit() {
    this.initForms();
    this.getDepartments()
    const urlArray = window.location.href.split("/");
    this._type = urlArray[urlArray.length - 1];
    this.mccData = [];
    this.schemes = JSON.parse(localStorage.getItem("mediclaimUser")).bls_serviceprovider.hospital.scheme_hospital;
  }

  initForms() {
    this.searchPreauthForm = this.fb.group({
      department_id: [null],
      sub_dept_id: [null],
      scheme_id: [null],
      mvc_no: [null],
      status: [null],
      member_no: [null],
      start_date: [new Date()],
      end_date: [new Date()]
    });
  }

  validateDates = (from_date, to_date) => {
    return new Promise<Boolean>((resolve) => {
      if (from_date && !to_date) {
        this.alert.fire('Error!', 'Enter an end date', 'error');
        resolve(false);
      }
      if (!from_date && to_date) {
        this.alert.fire('Error!', 'Enter a start date', 'error');
        resolve(false);
      }
      resolve(true);
    })
  }

  /**
 * Set subdepartments on select department
 */
  onSelectDept = () => {
    this.subDepartments = [];
    this.searchPreauthForm.patchValue({
      sub_dept_id: null
    });
    this.currentDepartment = this.searchPreauthForm.value.department_id.id;
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
 * Get all departments from the backend
 */
  getDepartments = () => {
    return new Promise<boolean>((resolve) => {
      this.fetching = true;
      this.serviceProvider.getDepartments().subscribe(data => {
        this.allDepartments = data;
        this.fetching = false;
        resolve(true);
      }, error => {
        this.fetching = false;
        resolve(false);
      });
    });
  };

  searchPreauth = async (e) => {
    e.preventDefault();
    const { member_no, mvc_no, scheme_id, department_id, sub_dept_id, status, start_date, end_date } = this.searchPreauthForm.value;
    const validated = await this.validateDates(start_date, end_date);
    if (!validated) return;
    this.searchParameters.start_date = moment(start_date);
    this.searchParameters.end_date = moment(end_date);
    scheme_id ? this.searchParameters.scheme_id = scheme_id : null;
    status ? this.searchParameters.status = status : null;
    department_id ? this.searchParameters.benefit = department_id.name : null;
    sub_dept_id ? this.searchParameters.sub_department = sub_dept_id : null;
    member_no ? this.searchParameters.member_no = member_no.toString() : null;
    mvc_no ? this.searchParameters.mcc_id = mvc_no.toString() : null;
    this.loading = true;
    switch (this._type) {
      case 'preauth':
        this.serviceProvider.searchPreauths(this.searchParameters).subscribe((data) => {
          this.loading = false;
          if (data && data.length === 0) {
            this.mccData = [];
            return this.alert.fire('Attention!', 'No Preauth records found', 'info');
          }
          if(data) this.mccData = this.sortByDate.transform(data);
        }, (error) => {
          this.loading = false;
        })
        break;

      case 'claim':
        this.serviceProvider.searchPreauths(this.searchParameters).subscribe((data) => {
          this.loading = false;
          if (data && data.length === 0) {
            this.mccData = [];
            return this.alert.fire('Attention!', 'No Claim records found', 'info');
          }
          if(data) this.mccData = this.sortByDate.transform(data);
        }, (error) => {
          this.loading = false;
        })

      default:
        break;
    }
  }

}
