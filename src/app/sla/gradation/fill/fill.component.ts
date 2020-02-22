import { Component, OnInit } from "@angular/core";
import { ServiceProviderService } from "src/app/_services/ServiceProvider/service-provider.service";

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
  constructor(private serviceProvider: ServiceProviderService) {}
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
    console.log(this.responseData);
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
      grading_title: this.responseData.grading_title,
      grading_description: this.responseData.grading_description,
      remarks: "-"
    };
    const dataToSave = {
      points: this.points,
      responses: this.response
    };
    this.serviceProvider.gradingResponse(dataToSave).subscribe(res => {
      console.log(res);
    });
  }
}
