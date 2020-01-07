import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiError } from 'src/app/_models/ApiError';
import Swal from 'sweetalert2';

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


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForms()
    this.searchFormApiError = { hasError: false, message: '' };
    this.searchFormSubmitted = false;
  }


  initForms() {
    this.searchForm = this.fb.group({
      scheme_id: [null, Validators.required],
      member_no: [null, Validators.required],
      mobile_phone_number: [null],
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

  searchMember = (e) => {
    e.preventDefault();
    this.memberFound = false;
    this.searchFormSubmitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    this.searchButtonText = "Loading"
    this.loading = true;
    this.searchFormApiError = { hasError: false, message: '' };
    this.serviceProvider.searchMember(this.searchForm.value).subscribe(async (data) => {
      this.loading = false;
      if (!data || data && data.length === 0) {
        this.searchFormApiError = { hasError: true, message: 'Member not found' };
        this.searchButtonText = 'Search';
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
      this.searchFormApiError = { hasError: true, message: 'An error occured in your request' };
    })
  }
  


  getDepartmentsAndSetConfigs = async() => {
    const  foundDepartments = await this.getDepartments();
    if(foundDepartments){
      this.getSchemeDepartments(this.currentSchemeId);
    }
    this.setHospitalConfigs.emit({
      allDepartments:this.allDepartments,
      hospitalConfigs: this.hospitalConfigs,
      departments: this.departments
    });
  }
  /**
   * Get all departments from the backend
   */
  getDepartments = () => {
    return new Promise<boolean>((resolve)=>{
      this.serviceProvider.getDepartments().subscribe(data => {
        this.allDepartments = data;
        resolve(true);
      }, error => {
        Swal.fire('An error occurred','error')
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
