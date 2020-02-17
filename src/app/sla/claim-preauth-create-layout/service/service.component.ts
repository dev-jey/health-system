import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ConvertFilesPipe } from 'src/app/_pipes/convert-files.pipe';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  @Input() _type;
  @Input() memberData;
  @Output() deleteItem = new EventEmitter();
  @Output() deductSubTotalAmount = new EventEmitter()
  @Output() setFinalDataItems = new EventEmitter();
  @Input() creatingOrEditing: boolean;
  @Input() editing: boolean;
  @Input() viewing: boolean;
  services: Array<any> = [];
  @Input() totalAmount;

  constructor(private ref: ChangeDetectorRef, private convertFiles: ConvertFilesPipe) { }
  ngOnInit() {
    if (this.memberData.investigations) {
      this.services = this.memberData.investigations;
    }
    this.setFinalDataItems.emit({ services: this.services });
    this.ref.detectChanges()
  }

  /**
   * 
   * @param e Reflect on change values
   * @param service 
   */
  onChange(e, service) {
    service.amount = service.units * service.unit_price;
    if (e.target.name === 'serviceFile') {
      this.convertFiles.transform(e).then((res) => {
        service.file = res;
        this.ref.detectChanges()
      });
    }
    service.mcc_id = String(this.memberData.id);
    this.setFinalDataItems.emit({ services: this.services });
  }

  /**
   * Add a new row
   */
  addService() {
    this.services.push({ investigation: { name: '' }, units: '', unit_price: '', amount: 0, file: '' });
  }
}
