import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from 'rxjs';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: Array<RouteSubInfo>
}
declare interface RouteSubInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/sla/dashboard",
    title: "Dashboard",
    icon: "fa-stop",
    class: ""
  },
  {
    path: "",
    title: "Generate",
    icon: "fa-angle-right",
    class: "drop-down",
    children: [
      {
        path: "/sla/mvc/generate",
        title: "MVC",
        icon: "fa-angle-right",
        class: ""
      },
      {
        path: "/sla/mvc/list",
        title: "Preauth/Claim",
        icon: "fa-angle-right",
        class: ""
      }
    ]
  },
  {
    path: "",
    title: "Gradation",
    icon: "fa-angle-right",
    class: "drop-down",
    children: [
      {
        path: "/sla/gradation/fill",
        title: "Grading Sheet",
        icon: "fa-angle-right",
        class: ""
      },
      {
        path: "/sla/gradation/view",
        title: "View",
        icon: "fa-angle-right",
        class: ""
      }
    ]
  },
  {
    path: "/sla/scheme-rules",
    title: "Scheme Rules",
    icon: "fa-stop",
    class: ""
  },
  {
    path: "/sla/contracts",
    title: "Contracts",
    icon: "fa-stop",
    class: ""
  }
];

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  currentChildren: any = {};
  sub: Subscription;
  sharedData: any;
  menuItems: Array<any> = [];
  currentItem: any = {};

  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit() {
    this.currentChildren = {}
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems.forEach(item => {
      if (item.children) {
        item.children.forEach(child => {
          if (child.path === window.location.pathname) {
            this.currentChildren = this.menuItems[this.menuItems.indexOf(item)]
          }
        })
      }
    })
    this.ref.detectChanges();
  }


  showMenuChildren = (data) => {
    const { index } = data;
    if (this.currentChildren === this.menuItems[index]) {
      this.currentChildren = {}
    } else {
      this.currentChildren = this.menuItems[index]
    }
  }
}
