import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';

@Component({
  selector: 'app-breakdown-dialog',
  templateUrl: './breakdown-dialog.component.html',
  styleUrls: ['./breakdown-dialog.component.scss']
})
export class BreakdownDialogComponent implements OnInit {
  currentMonth: any;
  currentYear: any;
  breakDownForm: FormGroup;
  months: Array<any> = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ]
  years: Array<number> = [
    2020,
    2019,
    2018,
    2017,
    2016,
    2015
  ]
  claimsTotal: number = 0;
  preauthTotal: number = 0;
  mvcTotal: number = 0;
  claimsAvg: number = 0;
  preauthAvg: string = '00:00:00';
  mvcAvg: number = 0;

  constructor(
    private serviceProvider: ServiceProviderService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BreakdownDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  initForms() {
    this.breakDownForm = this.fb.group({
      month: [null],
      year: [null]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Make API calls to get datafor the dashboard cards
   */
  getDashboardDetails(year, month) {
    const payload = { start_date: String(year + '-' + month.id) }
    return Promise.all([new Promise((resolve, reject) => {
      this.serviceProvider.getDashboardClaimData(payload).subscribe(data => {
        this.claimsTotal = data.claims.claims_total;
        this.claimsAvg = data.claims.claims_average;
        resolve();
      }, error => { reject() });
    }), new Promise((resolve, reject) => {
      this.serviceProvider.getDashboardPreauthData(payload).subscribe(data => {
        this.preauthTotal = data.preauths.preauths_total;
        this.preauthAvg = data.preauths.preauths_tat;
        resolve()
      }, error => { reject() });
    }), new Promise(((resolve, reject) => {
      this.serviceProvider.getDashboardMvcData(payload).subscribe(data => {
        this.mvcTotal = data.mccs.mcc_total;
        this.mvcAvg = data.mccs.mvc_average;
        resolve();
      }, error => { reject() });
    }))])
  }


  /**
   * Hnadles changes on date and year to get data for the dashboard
   */
  async onChangeYear() {
    const { month, year } = this.breakDownForm.value;
    if (month && year) {
      this.getDashboardDetails(year, month).then(() => {
        this.dialogRef.close({
          data: {
            month: month.name,
            year: year,
            claimsTotal: this.claimsTotal,
            preauthTotal: this.preauthTotal,
            mvcTotal: this.mvcTotal,
            claimsAvg: this.claimsAvg,
            preauthAvg: this.preauthAvg,
            mvcAvg: this.mvcAvg
          }
        });
        this.breakDownForm.reset();
      });
    }
  }
  ngOnInit() {
    this.initForms();
  }

}
