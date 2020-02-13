import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';
import { debounceTime } from 'rxjs/operators';

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
  @Output() calculateAmount = new EventEmitter();
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
  consultations: Array<any> = [];
  consultationSubTotal: number = 0;

  constructor(private fb: FormBuilder, private alert: AlertService, public ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.memberData.consultation ? this.consultations = this.memberData.consultation : null;
    this.setFinalDataItems.emit({ consultations: this.consultations });
    // this.calculateAmount({ consultationForm: null });
  }
  onChange(consultation) {
    // this.setFinalDataItems.emit({ consultations: this.consultations });
    consultation.amount = consultation.units * consultation.unit_price;
  }
  addConsultation() {
    this.consultations.push({ description: '', units: '', unit_price: '', amount:0, qualification: '', file: '' });
  }

}
