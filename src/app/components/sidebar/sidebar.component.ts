import { Component, OnInit } from "@angular/core";
import { AuthUser } from "src/app/_models/AuthUser";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/sla/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/sla/mvc/generate",
    title: "Generate MVC",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/sla/generate/mcc",
    title: "Generate PreAuth",
    icon: "icon-pin",
    class: "" 
  },
  {
    path: "/sla/reports",
    title: "Reports",
    icon: "icon-pin",
    class: "" 
  },
  {
    path: "/sla/scheme-rules",
    title: "Scheme Rules",
    icon: "icon-pin",
    class: "" 
  },
  {
    path: "/sla/contract",
    title: "Contract",
    icon: "icon-pin",
    class: "" 
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userData: AuthUser;
  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userData = JSON.parse(localStorage.getItem("mediclaimUser"));
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
