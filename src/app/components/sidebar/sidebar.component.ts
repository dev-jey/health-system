import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthUser } from "src/app/_models/authentication/AuthUser";


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  @Input() currentChildren;
  @Input() currentItem;
  @Input() menuItems;
  @Output() showMenuChildren = new EventEmitter();
  userDataHospital: String = 'N/A';
  // showChildren: boolean;

  constructor() { }

  ngOnInit() {
    this.userDataHospital = JSON.parse(localStorage.getItem("mediclaimUser")).hospital && JSON.parse(localStorage.getItem("mediclaimUser")).hospital.name.replace(/^(.{12}[^\s]*).*/, "$1") || 'N/A'
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
