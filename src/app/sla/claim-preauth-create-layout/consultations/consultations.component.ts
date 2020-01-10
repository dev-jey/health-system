import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ConsultationsComponent implements OnInit {
  @Input() amount: number;
  @Input() _type;
  @Output() deleteItem = new EventEmitter();
  // @Output() calculateAmount = new EventEmitter();
  @Input() memberData;
  @Input() docFile;
  @Output() convertFileToBase64 = new EventEmitter();
  @Output() setFinalDataItems = new EventEmitter();
  @Output() deductSubTotalAmount = new EventEmitter();
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
  consultationForm: FormGroup;
  consultationFormSubmitted: Boolean;
  consultationFormErrors: Object = {
    required: 'Field is Required'
  };
  @Input() totalAmount: any;
  editable: Boolean;
  currentIndex: any;
  isInValid: boolean;
  consultationAmount: number;

  constructor(private fb: FormBuilder, private alert: AlertService, public ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.initForms();
    this.memberData.consultation ? this.consultations.controls = this.memberData.consultation : null;
    this.setFinalDataItems.emit({ consultations: this.consultations.controls });
    // this.calculateAmount({ consultationForm: null });
  }

  initForms() {
    this.consultationForm = this.fb.group({
      consultations: this.fb.array([])
    });
  }

  checkInputChanges(){
    this.consultationForm.valueChanges.subscribe(
      () => {
        this.setFinalDataItems.emit({consultations: this.consultations.controls})
      }
    )

  }

  
  /**
   * 
   * Calculate totals helper function
   */

  calculateSubTotals(form) {
    let { units, unit_price } = form.value;
    if (!units) units = 0;
    if (!unit_price) unit_price = 0;
    return parseInt(units) * parseFloat(unit_price);
  }

    /**
   * Calculate total amount for individual steps and the grand total
   */
  calculateAmount(value) {
    const { consultationForm, serviceForm, prescriptionForm } = value;
    const amount = this.calculateSubTotals(consultationForm)
    console.log(consultationForm)
    console.log(value.consultationForm, '>>>>>>>>>>>>>>>>>>>>')
    if (consultationForm) {
      // console.log( value.consultationForm.controls.amount.value, '>......................')
      // value.consultationForm.controls['amount'].patchValue(amount, { emitEvent: true });
      //   this.consultationForm.updateValueAndValidity();
      value.consultationForm.patchValue({
        amount,
    });
    }
  }

  checkFormChanges(i) {
    this.consultationForm.valueChanges.subscribe(
      () => {
        this.calculateAmount({ consultationForm: this.consultations.controls[i] });
      }
    );
  }

  get consultations(): FormArray {
    return this.consultationForm.get("consultations") as FormArray
  }

  newConsultation(): FormGroup {
    return this.fb.group({
      description: [null, Validators.required],
      qualification: [null, Validators.required],
      units: [null, Validators.required],
      unit_price: [null, Validators.required],  
      amount: [null,  {disabled: true}]
    });
  }

  /**
   * Post a consultation
   */
  addConsultation(e) {
    this.isInValid = this.consultations.controls.some(function (consultation) {
      return consultation.invalid;
    });
    if (this.consultations.controls.length > 0) {
      this.isInValid ? this.alert.fire('Attention', 'Ensure you have filled all the required fields', 'info') : this.consultations.push(this.newConsultation());
    } else {
      this.consultations.push(this.newConsultation());
    }
    // e.preventDefault();
    // this.consultationFormSubmitted = true;
    // if (this.consultationForm.invalid) return;
    // this.checkDuplicate();
    // this.calculateAmount.emit({ consultationForm: this.consultationForm })
    // this.consultationForm.value.amount = this.amount;
    // if(this.docFile.filename !== 'File Upload') this.consultationForm.value.file = this.docFile;
    // this.consultationForm.value.mcc_id = String(this.memberData.id);
    // this.consultations ? this.consultations.unshift(this.consultationForm.value): [this.consultationForm.value]
    // // this.consultations.push(this.consultationForm.value);
    // this.consultations = Array.from(new Set(this.consultations));
    // this.setFinalDataItems.emit({ consultations: this.consultations });
    // this.consultationForm.reset();
    // this.consultationForm.value.amount = 0;
    // this.convertFileToBase64.emit('consultation')
    // this.consultationFormSubmitted = false;
  }

  /**
   * Edit existing consultation
   */
  editConsultation(i) {
    this.currentIndex = i;
    // this.consultationForm.value.mcc_id = String(this.memberData.id);
    // this.consultationForm.setValue({
    //   description: consultation.description,
    //   qualification: consultation.qualification,
    //   units: consultation.units,
    //   unit_price: consultation.unit_price
    // }, { emitEvent: true });
    // this.calculateAmount.emit({ consultationForm: this.consultationForm })
    // if (consultation.file) this.docFile = consultation.file;
    // this.setFinalDataItems.emit({ consultations: this.consultations });
    // this.ref.detectChanges();
  }

}
