import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakdownDialogComponent } from './breakdown-dialog/breakdown-dialog.component';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  claimsTotal: number = 0;
  preauthTotal: number = 0;
  mvcTotal: number = 0;
  month: number;
  year: number;
  claimsAvg: number = 0;
  preauthAvg: string = '00:00:00';
  mvcAvg: number = 0;
  loading: boolean;

  constructor(public dialog: MatDialog, private serviceProvider: ServiceProviderService) { }

  ngOnInit() {
    this.loading = true;
    this.serviceProvider.getDashboardsData().subscribe(data => {
      this.loading = false;
      const { claims, preauths, mccs } = data;
      this.claimsTotal = claims.claims_total;
      this.preauthTotal = preauths.preauths_total;
      this.mvcTotal = mccs.mcc_total;
      this.preauthAvg = preauths.preauths_tat;
      this.mvcAvg = mccs.mvc_average;
      this.month = claims.month;
      this.claimsAvg = claims.claims_average;
    })
  }

  openDialog(_type): void {
    const dialogRef = this.dialog.open(BreakdownDialogComponent, {
      width: '270px',
      data: { _type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { data: { claimsTotal, preauthTotal, month, year, mvcTotal, claimsAvg, preauthAvg, mvcAvg } } = result;
        this.claimsTotal = claimsTotal;
        this.preauthTotal = preauthTotal;
        this.mvcTotal = mvcTotal;
        this.month = month;
        this.year = year;
        this.claimsAvg = claimsAvg;
        this.preauthAvg = preauthAvg;
        this.mvcAvg = mvcAvg;
      }
    });
  }

}
