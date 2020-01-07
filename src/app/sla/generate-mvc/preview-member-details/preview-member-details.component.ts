import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceProviderService } from '../../../_services/ServiceProvider/service-provider.service';

@Component({
  selector: 'app-preview-member-details',
  templateUrl: './preview-member-details.component.html',
  styleUrls: ['./preview-member-details.component.scss']
})
export class PreviewMemberDetailsComponent implements OnInit {
  @Input() currentMember;
  @Input() dateOfBirth;
  @Input() age;
  @Input() currentMemberRelation;
  @Input() currentMemberBiometric;

  constructor(private serviceProvider: ServiceProviderService) {
   }
   
  ngOnInit() {
  }



}
