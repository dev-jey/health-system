import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-nhif-rebate',
  templateUrl: './nhif-rebate.component.html',
  styleUrls: ['./nhif-rebate.component.scss']
})
export class NhifRebateComponent implements OnInit {
  @Output() setFinalDataItems = new EventEmitter();
  @Input() _type;
  @Input() memberData;
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
  nhifRebateForm: FormGroup;
  nhifFormSubmitted: Boolean;
  nhifFormErrors: Object = {
    required: 'Field is Required'
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForms();
    if (this.memberData.rebuild) {
      console.log(this.memberData.rebuild)
      this.nhifRebateForm.setValue({
        nhif_rebate: this.memberData.rebuild
      })
    }
  }

  /**
   * Add rebate to rebate variable to be submitted to the preauth
   */
  addRebate() {
    this.setFinalDataItems.emit({ nhif_rebate: this.nhifRebateForm.value.nhif_rebate });
  }

  initForms() {
    this.nhifRebateForm = this.fb.group({
      nhif_rebate: [null, Validators.required],
    });
  }

}
