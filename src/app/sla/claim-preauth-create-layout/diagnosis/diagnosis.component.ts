import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  @Output() deleteItem = new EventEmitter();
  @Input() _type;
  @Input() memberData;
  diagnosisList: Array<any> = [];
  @Input() investigations: Array<any>;
  @Output() setFinalDataItems = new EventEmitter();
  diagnosisFormErrors: Object = {
    required: 'Field is Required'
  };
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
  currentDiagnosis: any = {};
  diagnosisForm: FormGroup;
  diagnosisFormSubmitted: boolean;
  diagnosisAdded: Array<any> = []
  constructor(private fb: FormBuilder, private alert: AlertService) {
  }

  /**
   * Check for duplicate Entries
   */
  addDiagnosis(e) {
    new Promise((resolve) => {
      e.preventDefault();
      this.diagnosisFormSubmitted = true;
      if (this.diagnosisForm.invalid) return;
      this.diagnosisAdded.forEach(diagnosis => {
        if (JSON.stringify(diagnosis) === JSON.stringify({
          health_condition_id: this.currentDiagnosis.id,
          mcc_id: String(this.memberData.id)
        }))
          this.alert.fire('Attention', 'Diagnosis record already added', 'info');
      })
      this.diagnosisAdded.push({
        health_condition_id: this.currentDiagnosis.id,
        mcc_id: String(this.memberData.id)
      });
      this.diagnosisList.push({ healthcondition: this.currentDiagnosis })
      this.diagnosisAdded = this.diagnosisAdded.filter((v, i, a) => a.findIndex(t => (t.health_condition_id === v.health_condition_id)) === i)
      this.diagnosisList = this.diagnosisList.filter((v, i, a) => a.findIndex(t => (t.healthcondition.id === v.healthcondition.id)) === i)
      this.setFinalDataItems.emit({ diagnosis: this.diagnosisAdded });
      resolve();
    }).then(() => {
      if (this.diagnosisForm.value.diagnosis) {
        this.diagnosisFormSubmitted = false;
        this.diagnosisForm.patchValue({
          diagnosis: null
        });
      }
    })
  }

  /**
   * Set current diagnosis on select from dropdown
   */
  setDiagnosis() {
    if (!this.diagnosisForm.value.diagnosis.name) return;
    this.currentDiagnosis = this.diagnosisForm.value.diagnosis;
  }

  initForms() {
    this.diagnosisForm = this.fb.group({
      diagnosis: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.initForms();
    this.memberData.diagnosis ? this.diagnosisList = this.memberData.diagnosis : null;
    this.setFinalDataItems.emit({ diagnosis: this.diagnosisList });
  }

}
