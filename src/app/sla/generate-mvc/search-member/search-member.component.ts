import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiError } from 'src/app/_models/ApiError';
import { AlertService } from 'src/app/_services/shared/alert.service';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.scss']
})
export class SearchMemberComponent implements OnInit {
  @Input() serviceProvider;
  @Input() objList;
  @Input() schemes;
  @Output() initScheme = new EventEmitter()
  @Output() setMemberDetails = new EventEmitter();
  @Output() setHospitalConfigs = new EventEmitter();
  memberFound: Boolean = false;
  age: number;
  currentSchemeId: number = null;
  searchButtonText: String = 'Search';
  loading: Boolean = false;
  searchFormApiError: ApiError;
  searchFormErrors = {
    required: 'Field is required'
  }
  searchFormSubmitted: boolean;
  searchForm: FormGroup;
  member: any;
  dependents: any;
  memberRelation: any;
  allDepartments: any;
  hospitalConfigs: any;
  departments: Array<any> = [];
  fetching: boolean;


  constructor(private fb: FormBuilder, private alert: AlertService) { }

  ngOnInit() {
    this.initForms()
    this.searchFormApiError = { hasError: false, message: '' };
    this.searchFormSubmitted = false;
    this.getDepartments();
  }


  initForms() {
    this.searchForm = this.fb.group({
      scheme_id: [null, Validators.required],
      member_no: [null],
      mobile_no: [null],
      national_id: [null]
    });
  }


  /**
   * Set current scheme id on dropdown select
   */
  onSelect = () => {
    this.currentSchemeId = this.searchForm.value.scheme_id;
    this.initScheme.emit(this.currentSchemeId)
  }


  /**
   * Check if user has entered at least one of the search parameters
   */
  validateFields = () => {
    return new Promise<Boolean>((resolve) => {
      const { member_no, mobile_no, national_id, scheme_id } = this.searchForm.value;
      if (scheme_id && !member_no && !mobile_no && !national_id) {
        this.alert.fire('Error!', 'Enter a member number, mobile number or national Id to search', 'error');
        resolve(false);
      } else {
        resolve(true);
      }
    })
  }


  /**
   * Set Search parameters to submit to the backend
   */
  setSearchParameters = (data) => {
    const { scheme_id, member_no, mobile_no, national_id } = data;
    let searchParams: any = {};
    searchParams.scheme_id = scheme_id;
    if(member_no) searchParams.member_no = member_no;
    if(mobile_no) searchParams.mobile_phone_number = mobile_no;
    if(national_id) searchParams.national_id = national_id;
    return searchParams; 
  }

  /**
   * Send a request to search the member in the backend
   */
  searchMember = async (e) => {
    e.preventDefault();
    if (!await this.validateFields()) return;
    this.memberFound = false;
    this.searchFormSubmitted = true;
    if (this.searchForm.invalid) return;
    this.searchButtonText = "Loading";
    const searchParams = this.setSearchParameters(this.searchForm.value);
    this.loading = true;
    this.searchFormApiError = { hasError: false, message: '' };
    this.serviceProvider.searchMember(searchParams).subscribe(async (data) => {
      this.loading = false;
      if (!data || data && data.length === 0) {
        this.searchButtonText = 'Search';
        this.alert.fire('Error!', 'Member not found', 'error');
      } else {
        this.memberFound = true;
        this.member = data;
        this.objList.push(this.member)
        this.member.dependents.forEach(dependent => {
          this.objList.push(dependent)
        })
        this.memberRelation = data.bls_member.relation;
        this.searchButtonText = 'Search';
        this.dependents = this.member['dependents'];
        await this.setMemberDetails.emit({
          member: this.member,
          objList: this.objList,
          dependents: this.dependents,
          memberRelation: this.memberRelation
        });
        this.getDepartmentsAndSetConfigs();
      }
    }, (error) => {
      this.loading = false;
      this.searchButtonText = "Search";
      this.alert.fire('Error!', 'An error occurred in your request', 'error')
    })
  }



  getDepartmentsAndSetConfigs = async () => {
    await this.getSchemeDepartments(this.currentSchemeId);
    this.setHospitalConfigs.emit({
      allDepartments: this.allDepartments,
      hospitalConfigs: this.hospitalConfigs,
      departments: this.departments
    });
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

  /**
   * Get current scheme's departments
   */
  getSchemeDepartments = (schemeId) => {
    JSON.parse(localStorage.getItem('mediclaimUser')).bls_serviceprovider.hospital.scheme_hospital.forEach(hospital => {
      if (hospital.scheme_id === schemeId) {
        this.hospitalConfigs = hospital
      }
    });
    this.objList[0].user_category.forEach(category => {
      if (category.category.scheme_id === schemeId) {
        category.category.category_departments.forEach((department) => {
          if (this.hospitalConfigs[department.department.name.toLowerCase()] === 1) {
            this.departments.push(department.department);
            if (department.department.name.toLowerCase() === 'inpatient') {
              this.departments.push({
                id: 6,
                name: "Inpatient Follow-up"
              });

            }
          }
        })
      }
    });
  }

}
