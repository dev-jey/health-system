import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-select-dependent',
  templateUrl: './select-dependent.component.html',
  styleUrls: ['./select-dependent.component.scss']
})
export class SelectDependentComponent implements OnInit {
  @Input() dependents;
  @Input() member;
  @Input() memberRelation;
  @Output() setDependentDetails = new EventEmitter();
  
  currentMember: any;
  isSelected: boolean;
  currentMemberBiometric: any;
  currentMemberRelation: any;
  dateOfBirth: string;
  age: number;

  constructor() { }

  ngOnInit() {
    this.currentMember = this.member;
  }


  /**
   * Select dependent and set member relation
   */
  selectDependent = (member) => {
    this.currentMember = member;
    this.isSelected = true;
    this.currentMemberBiometric = member.biometrics;
    this.currentMemberRelation = member.bls_member.relation;
    this.dateOfBirth = moment(this.currentMember.date_of_birth).format("MM/DD/YYYY");
    this.age = this.calculateAge()
    this.setDependentDetails.emit({
      age: this.age,
      dateOfBirth: this.dateOfBirth,
      currentMember: this.currentMember,
      currentMemberRelation: this.currentMemberRelation,
      currentMemberBiometric: this.currentMemberBiometric
    })
  }


  /**
   * Calculate Age
   */
  calculateAge = () => { // birthday is a date
    return new Date().getFullYear() - new Date(this.dateOfBirth).getFullYear();
  }


}
