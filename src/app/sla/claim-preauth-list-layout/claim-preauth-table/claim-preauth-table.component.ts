import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-claim-preauth-table',
  templateUrl: './claim-preauth-table.component.html',
  styleUrls: ['./claim-preauth-table.component.scss']
})
export class ClaimPreauthTableComponent implements OnInit {
  @Input() mccData;
  @Input() _type;
  page: number = 1;
  
  constructor() { }

  ngOnInit() {
  }

}
