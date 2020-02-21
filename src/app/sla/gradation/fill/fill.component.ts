import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.scss']
})
export class FillComponent implements OnInit {
  gradingForm: FormGroup;
  facilityTypes: Array<any>=[];
  gradingFormSubmitted: boolean;
  gradingFormErrors: any={
    required: "Field is required"
  }
  constructor(private fb: FormBuilder,) { }
  initForms() {
    this.gradingForm = this.fb.group({
      grading_title: [null, Validators.required],
      grading_description: [null, Validators.required],
      facility_id: [null, Validators.required]
    });
  }
  ngOnInit() {
    this.initForms()
  }

  /**
   * 
   * @param e On select facility type
   */
  onSelect(){}

  /**
   * Submit Grading Sheet
   */
  submitSheet(e){}

}
