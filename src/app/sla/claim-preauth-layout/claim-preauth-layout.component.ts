import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-claim-preauth-layout',
  templateUrl: './claim-preauth-layout.component.html',
  styleUrls: ['./claim-preauth-layout.component.scss']
})
export class ClaimPreauthLayoutComponent implements OnInit {
  @Input() memberData: any;
  @Input() loading: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
