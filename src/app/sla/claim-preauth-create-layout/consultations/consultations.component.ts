import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ConvertFilesPipe } from 'src/app/_pipes/convert-files.pipe';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultationsComponent implements OnInit {
  @Input() _type;
  @Output() deleteItem = new EventEmitter();
  @Input() memberData;
  @Output() setFinalDataItems = new EventEmitter();
  @Output() deductSubTotalAmount = new EventEmitter();
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
  @Input() totalAmount: any;
  consultations: Array<any> = [];

  constructor(private convertFiles: ConvertFilesPipe, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.memberData.consultation) {
      this.consultations = this.memberData.consultation;
    }
    this.setFinalDataItems.emit({ consultations: this.consultations });
    this.ref.detectChanges()
  }

  /**
   * 
   * @param e Reflect on change values
   * @param consultation 
   */
  onChange(e, consultation) {
    consultation.amount = consultation.units * consultation.unit_price;
    if (e.target.name === 'consultationFile') {
      this.convertFiles.transform(e).then((res) => {
        consultation.file = res;
        this.ref.detectChanges()
      });
    }
    consultation.mcc_id = String(this.memberData.id);
    this.setFinalDataItems.emit({ consultations: this.consultations });
  }

  /**
   * Add a new row
   */
  addConsultation() {
    this.consultations.push({ description: '', units: '', unit_price: '', amount: 0, qualification: '', file: '' });
  }

}
