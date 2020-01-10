import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as Chart from 'chart.js'
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';

@Component({
  selector: 'app-graphs-layout',
  templateUrl: './graphs-layout.component.html',
  styleUrls: ['./graphs-layout.component.scss']
})
export class GraphsLayoutComponent implements OnInit {
  loading: boolean;
  schemes: Array<any> = [];
  departments: Array<any> = [];
  graphFormErrors = {
    required: 'Field is required'
  }
  graphMvcFormSubmitted: boolean;
  graphMvcForm: FormGroup;
  graphPreauthFormSubmitted: boolean;
  graphPreauthForm: FormGroup;
  graphClaimFormSubmitted: boolean;
  graphClaimForm: FormGroup;
  dashboard: any = {};

  constructor(private serviceProvider: ServiceProviderService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.initForms();
    this.getInitialDashboardData();
    Promise.all([new Promise((resolve) => {
      this.serviceProvider.getSchemes().subscribe(data => {
        this.schemes = data;
        resolve();
      }, error => {
        resolve();
      });
    }),
    new Promise((resolve) => {
      this.serviceProvider.getDepartments().subscribe(data => {
        this.departments = data;
        resolve();
      }, error => {
        resolve();
      });
    })
    ]).then(() => {
      this.loading = false;
    })
  }

  getInitialDashboardData(){
  this.serviceProvider.getDashboardsData().subscribe(data =>{
    this.dashboard.preauths = data.preauths;
    this.dashboard.mccs = data.mccs;
    this.dashboard.claims = data.claims;
    this.displayMVCCharts(this.dashboard);
    this.displayPreauthCharts(this.dashboard);
    this.displayClaimCharts(this.dashboard);
  })
}

  initForms() {
    this.graphMvcForm = this.fb.group({
      scheme: [null, Validators.required],
      department: [null, Validators.required]
    });
    this.graphPreauthForm = this.fb.group({
      scheme: [null, Validators.required],
      department: [null, Validators.required]
    });
    this.graphClaimForm = this.fb.group({
      scheme: [null, Validators.required],
      department: [null, Validators.required]
    });
  }

  /**
   * 
   * Get MVC data from API for graph 
   */
  graphMVCFilter(e) {
    e.preventDefault();
    this.graphMvcFormSubmitted = true;
    if (this.graphMvcForm.invalid) return;
    const payload = this.graphMvcForm.value;
    this.loading = true;
    return new Promise(((resolve, reject) => {
        this.serviceProvider.getDashboardMvcData(payload).subscribe(data => {
          this.dashboard.mccs = data.mccs;
          resolve();
        }, error => { reject() });
      })).then(() => {
      this.displayMVCCharts(this.dashboard);
    })
  }

  /**
   * Get Preauth data from API for graph
   */
  graphPreauthFilter(e) {
    e.preventDefault();
    this.graphPreauthFormSubmitted = true;
    if (this.graphPreauthForm.invalid) return;
    const payload = this.graphPreauthForm.value;
    this.loading = true;
    return new Promise((resolve, reject) => {
        this.serviceProvider.getDashboardPreauthData(payload).subscribe(data => {
          this.dashboard.preauths = data.preauths;
          resolve()
        }, error => { reject() });
      }).then(() => {
      this.displayPreauthCharts(this.dashboard);
    })
  }

  /**
   * Get Claim data from API for graph
   */
  graphClaimFilter(e) {
    e.preventDefault();
    this.graphClaimFormSubmitted = true;
    if (this.graphClaimForm.invalid) return;
    const payload = this.graphClaimForm.value;
    this.loading = true;
    return  new Promise((resolve, reject) => {
        this.serviceProvider.getDashboardClaimData(payload).subscribe(data => {
          this.dashboard.claims = data.claims;
          resolve();
        }, error => { reject() });
      }).then(() => {
      this.displayClaimCharts(this.dashboard);
    })
  }

  /**
   * Get canvas, context and set data and colors to appear on graph
   */
  displayMVCCharts = (my_dashbords) => {
    this.dashboard = my_dashbords;
    // MVCs Chart Begins
    const mvc = <HTMLCanvasElement>document.getElementById("mvc-chart");
    const ctxP = mvc.getContext('2d');
    // debugger;
    const data = {
      labels: ['Not Used', 'Claim Raised', 'Preauth Raised'],
      datasets: [{
        data: [
          this.dashboard.mccs.mcc_not_used,
          this.dashboard.mccs.mcc_claim_raised,
          this.dashboard.mccs.mcc_preauth_raised
        ],
        backgroundColor: [
          '#8dd3c7',
          '#bebada',
          '#fdb462',
          '#80b1d3'
        ],
      }]
    };
    this.createChart(ctxP, data);
    this.loading = false;
  }

  /**
      * Get canvas, context and set data and colors to appear on graph
      */
  displayPreauthCharts = (my_dashbords) => {
    this.dashboard = my_dashbords;
    // Preauth Chart Begins
    const mvc = <HTMLCanvasElement>document.getElementById("preauth-chart");
    const ctxP = mvc.getContext('2d');
    // debugger;
    var data = {
      labels: ['Pending', 'Approved', 'Incomplete', 'Rejected', 'Fraud'],
      datasets: [{
        data: [
          this.dashboard.preauths.preauths_unprocessed,
          this.dashboard.preauths.preauths_approved,
          this.dashboard.preauths.preauths_hold,
          this.dashboard.preauths.preauths_rejected,
          this.dashboard.preauths.preauths_fraud
        ],
        backgroundColor: [
          '#8dd3c7',
          '#fdb462',
          '#bebada',
          '#fa8072',
          'rgb(150, 90, 70)',
          '#80b1d3'
        ],
      }]
    };
    this.createChart(ctxP, data);
    this.loading = false;
  }

  /**
      * Get canvas, context and set data and colors to appear on graph
      */
  displayClaimCharts = (my_dashbords) => {
    this.dashboard = my_dashbords;
    // Claim Chart Begins
    const mvc = <HTMLCanvasElement>document.getElementById("claim-chart");
    const ctxP = mvc.getContext('2d');
    // debugger;
    var data = {
      labels: ['Pending', 'Approved', 'Incomplete', 'Rejected', 'Fraud'],
      datasets: [{
        data: [
          this.dashboard.claims.claims_unprocessed,
          this.dashboard.claims.claims_approved,
          this.dashboard.claims.claims_hold,
          this.dashboard.claims.claims_rejected,
          this.dashboard.claims.claims_fraud
        ],
        backgroundColor: [
          '#8dd3c7',
          '#fdb462',
          '#bebada',
          '#fa8072',
          'rgb(150, 90, 70)',
          '#80b1d3'
        ],
      }]
    };
    this.createChart(ctxP, data);
    this.loading = false;
  }

  /**
   * Create the actual chart with axes, legends and tooltips
   */
  createChart(ctxP, data) {
    return new Chart(ctxP, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        "hover": {
          "animationDuration": 0
        },
        "animation": {
          "duration": 500,
          "easing": "easeInSine",
          "onComplete": function () {
            var chartInstance = this.chart,
              item = chartInstance.ctx;
            item.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            item.textAlign = 'center';
            item.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                item.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        legend: {
          "display": false
        },
        tooltips: {
          "enabled": true
        },
        scales: {
          yAxes: [{
            display: true,
            barPercentage: 0.2,
            categoryPercentage: 0.2,scaleShowLabels: false,
            gridLines: { lineWidth: 0
            },
            ticks: {
              display: false,
              beginAtZero: true
            }
          }],
          xAxes: [{
            barPercentage: 0.5,
            categoryPercentage: 0.5,
            gridLines: { lineWidth: 0
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
