import { Component, OnInit } from "@angular/core";
import { ServiceProviderService } from "src/app/_services/ServiceProvider/service-provider.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/_services/shared/alert.service";

@Component({
  selector: "app-fill",
  templateUrl: "./fill.component.html",
  styleUrls: ["./fill.component.scss"]
})
export class FillComponent implements OnInit {
  facilityTypes: Array<any> = [];
  gradingFormSubmitted: boolean;
  gradingFormErrors: any = {
    required: "Field is required"
  };
  userTypes: any;
  categories: Array<any> = [];
  responseData: any = {};
  response: Array<any> = [];
  facilityId: any;
  points: {
    grading_user_type_id: any;
    stakeholder_id: any;
    grading_title: any;
    grading_description: any;
    remarks: string;
  };
  responseLabels: any = {};
  constructor(
    private serviceProvider: ServiceProviderService,
    private router: Router,
    private alert: AlertService
  ) {}
  ngOnInit() {
    this.getUserTypes();
  }

  /**
   * Get userr types
   */

  getUserTypes() {
    this.serviceProvider.getUserType().subscribe(data => {
      this.userTypes = data.data;
    });
  }

  /**
   *
   * @param e On select facility type
   */
  onSelect() {
    this.serviceProvider
      .getGradingQuestionairre(this.facilityId, 1)
      .subscribe(data => {
        this.categories = data.data;
      });
  }

  /**
   * Submit Grading Sheet
   */
  submitSheet(e) {
    e.preventDefault();
    this.response = [];
    for (var key in this.responseData) {
      if (this.responseData.hasOwnProperty(key)) {
        this.response.push({
          grading_item_id: parseInt(key),
          response: this.responseData[key],
          score: 0
        });
      }
    }
    this.points = {
      grading_user_type_id: this.facilityId,
      stakeholder_id: JSON.parse(localStorage.getItem("mediclaimUser"))
        .bls_serviceprovider.id,
      grading_title: this.responseLabels.grading_title,
      grading_description: this.responseLabels.grading_description,
      remarks: "-"
    };
    const dataToSave = {
      points: this.points,
      responses: this.response
    };
    this.serviceProvider.gradingResponse(dataToSave).subscribe(
      res => {
        this.router.navigateByUrl(`/sla/gradation/view/${res.data.id}`);
      },
      error => {
        this.alert.fire(
          "Attention",
          "Kindly ensure you fill in all the fields before you submit",
          "info"
        );
      }
    );
  }
}
