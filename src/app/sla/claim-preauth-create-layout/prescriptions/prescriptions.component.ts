import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConvertFilesPipe } from 'src/app/_pipes/convert-files.pipe';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  @Input() _type;
  @Input() memberData;
  @Output() setFinalDataItems = new EventEmitter();
  @Output() deleteItem = new EventEmitter();
  @Output() deductSubTotalAmount = new EventEmitter();
  @Input() totalAmount;
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
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

  constructor(private ref: ChangeDetectorRef, private convertFiles: ConvertFilesPipe) { }
  ngOnInit() {
    if (this.memberData.investigation) {
      this.prescriptions = this.memberData.investigation;
    }
    this.setFinalDataItems.emit({ prescriptions: this.prescriptions });
    this.ref.detectChanges()
  }

  /**
   * 
   * @param e Reflect on change values
   * @param prescription 
   */
  onChange(e, prescription) {
    prescription.amount = prescription.units * prescription.unit_price;
    if (e.target.name === 'prescriptionFile') {
      this.convertFiles.transform(e).then((res) => {
        prescription.file = res;
        this.ref.detectChanges()
      });
    }
    this.setFinalDataItems.emit({ prescriptions: this.prescriptions });
  }

  /**
   * Add a new row
   */
  addPrescription() {
    this.prescriptions.push({ dosage: '', drug: '', administration: '', duration: '', units: '', unit_price: '', amount: 0, file: '' });
  }
}
