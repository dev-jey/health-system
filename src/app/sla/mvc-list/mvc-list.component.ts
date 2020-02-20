import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import * as moment from 'moment';
import { SortByDatePipe } from 'src/app/_pipes/sort-by-date.pipe';
@Component({
  selector: 'app-mvc-list',
  templateUrl: './mvc-list.component.html',
  styleUrls: ['./mvc-list.component.scss']
})
export class MvcListComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  mvcForm: FormGroup;
  searchParameters: any = {};
  mccData: Array<any>;
  loading: boolean;
  constructor(private fb: FormBuilder, private alert: AlertService, private serviceProvider: ServiceProviderService, private sortByDate:SortByDatePipe) {

  }

  ngOnInit() {
    this.initForms();
    this.mccData = [];
  }

  initForms() {
    this.mvcForm = this.fb.group({
      mvc_no: [null],
      member_no: [null],
      start_date: [new Date()],
      end_date: [new Date()]
    });
  }

  clearFields() {
    this.mvcForm.reset();
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

  searchMvcs = async (e) => {
    e.preventDefault();
    const { member_no, mvc_no, start_date, end_date } = this.mvcForm.value;
    const validated = await this.validateDates(start_date, end_date);
    if (!validated) return;
    this.searchParameters.hospital_id = JSON.parse(localStorage.getItem('mediclaimUser')).hospital.id;
    this.searchParameters.start_date = moment(start_date);
    this.searchParameters.end_date = moment(end_date);
    member_no ? this.searchParameters.member_no = member_no : this.searchParameters.member_no = null;
    mvc_no ? this.searchParameters.mvc_no = mvc_no.toString() : this.searchParameters.mvc_no = null;
    this.loading = true;
    this.serviceProvider.getMvcList(this.searchParameters).subscribe((data) => {
      this.loading = false;
      if (data.length === 0) {
        this.mccData = [];
        return this.alert.fire('Attention!', 'No MVC records found', 'info');
      }
      this.mccData = this.sortByDate.transform(data);
    }, (error) => {
      this.loading = false;
    })
  }

}
