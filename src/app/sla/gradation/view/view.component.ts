import { Component, OnInit } from "@angular/core";
import { ServiceProviderService } from "src/app/_services/ServiceProvider/service-provider.service";
import { SortByDatePipe } from "src/app/_pipes/sort-by-date.pipe";
@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit {
  gradations: Array<any> = [];
  loading: boolean;
  constructor(
    private serviceProvider: ServiceProviderService,
    private sortByDate: SortByDatePipe
  ) {}

  ngOnInit() {
    const stakeholder_id = JSON.parse(localStorage.getItem("mediclaimUser"))
      .bls_serviceprovider.id;
    this.loading = true;
    this.serviceProvider.gerGradations(stakeholder_id).subscribe(res => {
      this.gradations = this.sortByDate.transformGrading(res.data);
      this.loading = false;
    });
  }
}
