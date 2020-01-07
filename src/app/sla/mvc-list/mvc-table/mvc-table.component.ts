import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mvc-table',
  templateUrl: './mvc-table.component.html',
  styleUrls: ['./mvc-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MvcTableComponent implements OnInit {
  @Input() mccData;

  page: number = 1;

  constructor() { }

  ngOnInit() {
    console.log(this.mccData)
  }

}
