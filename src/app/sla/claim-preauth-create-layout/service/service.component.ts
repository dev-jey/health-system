import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from 'src/app/_services/shared/alert.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  @Input() amount: number;
  @Input() _type;
  @Input() memberData;
  @Input() docFile;
  @Output() deleteItem = new EventEmitter();
  @Output() convertFileToBase64 = new EventEmitter();
  @Output() calculateAmount = new EventEmitter()
  @Output() deductSubTotalAmount = new EventEmitter()
  @Output() setFinalDataItems = new EventEmitter();
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
  serviceForm: FormGroup;
  serviceFormSubmitted: boolean;
  // serviceOptions: Array<any> = [
  //   { id: 1, name: "Cancer Screening" },
  //   { id: 2, name: "Malaria" }
  // ];
  services: Array<any> = [];
  serviceFormErrors: Object = {
    required: 'Field is Required'
  };
  currentService: any;
  @Input() totalAmount;

  constructor(private fb: FormBuilder, private alert: AlertService) { }

  ngOnInit() {
    this.initForms();
    if (this.memberData.investigations) {
      this.memberData.investigations.forEach(investigation => {
        investigation.name = investigation.investigation.name
      })
      this.services = this.memberData.investigations;
    }
    this.setFinalDataItems.emit({ services: this.services });
    this.calculateAmount.emit({ serviceForm: null })
  }

  /**
   * Prevent duplicate services from being added to list
   */
  checkDuplicate() {
    this.services.forEach((service) => {
      if (JSON.stringify(service) == JSON.stringify(this.serviceForm.value)) {
        this.alert.fire('Attention', 'This record has already been added', 'info');
      }
    })
  }

  // setService() {
  //   this.currentService = this.serviceForm.value.searchInvestigation;
  // }

  addService() {
    this.serviceFormSubmitted = true;
    if (this.serviceForm.invalid) return;
    this.checkDuplicate();
    this.calculateAmount.emit({ serviceForm: this.serviceForm })
    this.serviceForm.value.amount = this.amount;
    if(this.docFile.filename !== 'File Upload') this.serviceForm.value.file = this.docFile;
    this.serviceForm.value.mcc_id = String(this.memberData.id);
    this.services.push(this.serviceForm.value);
    this.services = Array.from(new Set(this.services));
    this.setFinalDataItems.emit({ services: this.services });
    this.serviceForm.reset()
    this.serviceForm.value.amount = 0;
    this.convertFileToBase64.emit('service')
    this.serviceFormSubmitted = false;
  }

  /**
 * Edit existing service
 */
  editService(service) {
    this.serviceForm.value.mcc_id = String(this.memberData.id);
    this.serviceForm.setValue({
      name: service.name,
      units: service.units,
      unit_price: service.unit_price
    }, { emitEvent: true });
    this.calculateAmount.emit({ serviceForm: this.serviceForm })
    if (service.file) this.docFile.filename = service.file.filename;
    this.setFinalDataItems.emit({ services: this.services });
  }


  ngAfterViewInit() {
    this.serviceForm.valueChanges.subscribe(
      () => {
        this.calculateAmount.emit({ serviceForm: this.serviceForm })
      }
    );
  }

  checkFormChanges() {
    this.serviceForm.valueChanges.subscribe(
      () => this.calculateAmount.emit({ serviceForm: this.serviceForm })
    );
  }

  initForms() {
    this.serviceForm = this.fb.group({
      name: [null, Validators.required],
      units: [null, Validators.required],
      unit_price: [null, Validators.required]
    });
  }
}
