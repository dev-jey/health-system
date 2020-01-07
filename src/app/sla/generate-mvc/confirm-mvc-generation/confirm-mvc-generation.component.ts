import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-mvc-generation',
  templateUrl: './confirm-mvc-generation.component.html',
  styleUrls: ['./confirm-mvc-generation.component.scss']
})
export class ConfirmMvcGenerationComponent implements OnInit {
  @Input() optValidated: boolean;
  @Input() mcc_number;
  @Input() completeMVC: boolean;
  @Input() currentMember;
  @Input() dateOfBirth
  constructor() { }

  ngOnInit() {
  }

}
