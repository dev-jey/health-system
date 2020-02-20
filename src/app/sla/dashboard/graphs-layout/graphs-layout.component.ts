import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import * as Chart from 'chart.js'
import * as Highcharts from 'highcharts';
// import { Chart } from 'angular-highcharts';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';



declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
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

  public options: any = {
    chart: {
      type: 'column',
      height: 400
    },
    title: {
      text: 'MVC Chart'
    },
    subtitle: {
      text: 'MVC data breakdown'
    },
    credits: {
      enabled: true
    },
    tooltip: {
      formatter: function () {
        return this.series.name + ' : ' + this.y;
      }
    },
    exporting: {
      enabled: true
    },
    yAxis: {
      title: {
        text: 'Count'
      }
    },
    xAxis: {
      type: 'string',
      categories: [1],
      title: {
        text: 'Types'
      },
      labels: {
        formatter: function () {
          return this.value;
        }
      }
    },
    series: [
      {
        name: 'Not Used',
        turboThreshold: 500000,
        data: [400, 300, 123, 123, 123, 434, 523]
      },
      {
        name: 'Preauth Created',
        turboThreshold: 500000,
        data: [223, 234, 563, 234, 123, 342, 421]
      },
      {
        name: 'Claim Created',
        turboThreshold: 500000,
        data: [120, 224, 313, 233, 121, 231, 234]
      }
    ]
  }
  public claimOptions: any = {
    ...this.options,
    chart: {
      type: 'spline',
      height: 400
    },
    title: {
      text: 'Claim Chart'
    },
    subtitle: {
      text: 'Claim data breakdown'
    },
    series: [
      {
        name: 'Pending',
        turboThreshold: 500000,
        data: [400, 300, 123, 123, 123, 434, 523]
      },
      {
        name: 'Approved',
        turboThreshold: 500000,
        data: [223, 234, 563, 234, 123, 342, 421]
      },
      {
        name: 'Incomplete',
        turboThreshold: 500000,
        data: [120, 224, 313, 233, 121, 231, 234]
      },
      {
        name: 'Rejected',
        turboThreshold: 500000,
        data: [121, 222, 313, 235, 128, 231, 239]
      },
      {
        name: 'Fraud',
        turboThreshold: 500000,
        data: [130, 244, 343, 213, 121, 261, 234]
      }
    ]
  }
  public preauthOptions: any = {
    ...this.claimOptions,
    chart: {
      type: 'area',
      height: 400
    },
    title: {
      text: 'Claim Chart'
    },
    subtitle: {
      text: 'Claim data breakdown'
    },
  }

  constructor(private serviceProvider: ServiceProviderService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loading = true;
    this.initForms();
    // this.getInitialDashboardData();
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
      Highcharts.chart('mvc-graph', this.options);
      Highcharts.chart('claim-graph', this.claimOptions);
      Highcharts.chart('preauth-graph', this.preauthOptions);

    })
  }

  getInitialDashboardData() {
    this.serviceProvider.getDashboardsData().subscribe(data => {
      this.dashboard.preauths = data.preauths;
      this.dashboard.mccs = data.mccs;
      this.dashboard.claims = data.claims;
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
    return new Promise((resolve, reject) => {
      this.serviceProvider.getDashboardClaimData(payload).subscribe(data => {
        this.dashboard.claims = data.claims;
        resolve();
      }, error => { reject() });
    }).then(() => {
    })
  }

}
