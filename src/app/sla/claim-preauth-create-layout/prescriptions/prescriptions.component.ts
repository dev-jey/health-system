import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  @Input() amount: number;
  @Input() _type;
  @Input() memberData;
  @Output() setFinalDataItems = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  @Output() deductSubTotalAmount = new EventEmitter();
  @Output() convertFileToBase64 = new EventEmitter();
  @Output() calculateAmount = new EventEmitter();
  @Input() docFile;
  @Input() totalAmount;
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
  prescriptionForm: FormGroup;
  prescriptionFormSubmitted: Boolean;
  prescriptionFormErrors: Object = {
    required: 'Field is Required'
  };
  currentDosage: any;
  currentAdministration: any;
  prescriptions: Array<any> = [];

  dosages: Array<any> = [
    { "name": "2 times a day (BDS)" }, { "name": "3 times a day (TDS, TID)" },
    { "name": "4 times a day (QDS, QID)" }, { "name": "A sufficient quantity (QS)" },
    { "name": "As directed (UD)" }, { "name": "As needed (PRN)" },
    { "name": "After food (PC)" }, { "name": "Afternoon or evening (PC)" },
    { "name": "At Bedtime (HS)" }, { "name": "Before Meals (a.c)" },
    { "name": "Daily (QD)" }, { "name": "Every Afternoon (qPM)" },
    { "name": "Every hour (QH)" }, { "name": "Every Morning (qAM)" },
    { "name": "Every Night at Bedtime (QHS)" }, { "name": "Every Other Day (QOD)" },
    { "name": "Immediately (Stat.)" }, { "name": "Once a day (OD)" },
    { "name": "Morning (AM)" }, { "name": "Twice daily (BD)" }
  ];


  administrations: Array<any> = [
    { "name": "Aural (ear)" }, { "name": "Both Ears Together (AU)" },
    { "name": "Both Eyes (OU)" }, { "name": "Inhalation" },
    { "name": "Intravenous (IV)" }, { "name": "Intramuscular (IM)" },
    { "name": "Left Ear (AS)" }, { "name": "Left Eye (OS)" },
    { "name": "Nasal (nose)" }, { "name": "Not by oral administration (NPO)" },
    { "name": "Ocular (eye)" }, { "name": "Oral (PO)" },
    { "name": "Rectal (PR)" }, { "name": "Right Ear (AD)" },
    { "name": "Right Eye" }, { "name": "Subcutaneous (SC)" },
    { "name": "Topical" }, { "name": "Vaginal" }
  ];

  constructor(private fb: FormBuilder, private alert: AlertService) { }


  initForms() {
    this.prescriptionForm = this.fb.group({
      drug: [null, Validators.required],
      dosage: [null, Validators.required],
      administration: [null, Validators.required],
      duration: [null, Validators.required],
      units: [null, Validators.required],
      unit_price: [null, Validators.required]
    });
  }

  /**
   * Prevent duplicate prescriptions from being added to list
   */
  checkDuplicate() {
    this.prescriptions.forEach((prescription) => {
      if (JSON.stringify(prescription) == JSON.stringify(this.prescriptionForm.value)) {
        this.alert.fire('Attention', 'This record has already been added', 'info');
      }
    })
  }

  /**
   * Add entered prescriptions to prescriptions list
   */
  addPrescription() {
    this.prescriptionFormSubmitted = true;
    if (this.prescriptionForm.invalid) return;
    this.checkDuplicate();
    this.prescriptionForm.value.amount = this.amount;
    if(this.docFile.filename !== 'File Upload') this.prescriptionForm.value.file = this.docFile;
    this.prescriptionForm.value.mcc_id = String(this.memberData.id);
    this.prescriptions.push(this.prescriptionForm.value);
    this.prescriptions = Array.from(new Set(this.prescriptions));
    this.setFinalDataItems.emit({ prescriptions: this.prescriptions });
    this.prescriptionForm.reset()
    this.prescriptionForm.value.amount = 0;
    this.convertFileToBase64.emit('prescription')
    this.prescriptionFormSubmitted = false;
  }

  ngAfterViewInit(){  
    this.prescriptionForm.valueChanges.subscribe(
      () => {
        this.calculateAmount.emit({ prescriptionForm: this.prescriptionForm })
      }
    );
  }
    /**
   * Edit existing prescription
   */
  editPrescription(prescription) {
    this.prescriptionForm.value.mcc_id = String(this.memberData.id);
    this.prescriptionForm.setValue({
      drug: prescription.drug,
      administration: prescription.administration,
      duration: prescription.duration,
      dosage: prescription.dosage,
      units: prescription.units,
      unit_price: prescription.unit_price
    }, {emitEvent: true});
    this.calculateAmount.emit({ prescriptionForm: this.prescriptionForm })
    if (prescription.file) this.docFile = prescription.file;
    this.setFinalDataItems.emit({ prescriptions: this.prescriptions });
  }

  /**
   * Update Totals Price Changes on unit change
   */
  checkFormChanges() {
    this.prescriptionForm.valueChanges.subscribe(
      () => this.calculateAmount.emit({ prescriptionForm: this.prescriptionForm })
    );
  }

  /**
   * Set current dosage from dropdown
   */
  setDosage() {
    this.currentDosage = this.prescriptionForm.value.dosage;
  }

  /**
   * Set current administration type from administrations dropdown 
   */
  setAdministration() {
    this.currentAdministration = this.prescriptionForm.value.administration;
  }

  ngOnInit() {
    this.initForms();
    this.memberData.prescriptions ? this.prescriptions = this.memberData.prescriptions : null;
    this.setFinalDataItems.emit({ prescriptions: this.prescriptions });
    this.calculateAmount.emit({ prescriptionForm: null })
  }

}
