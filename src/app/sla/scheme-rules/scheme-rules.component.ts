import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import { FileService } from 'src/app/_services/shared/file.service';
import { Scheme } from '../../_models/sla/scheme';
@Component({
  selector: 'app-scheme-rules',
  templateUrl: './scheme-rules.component.html',
  styleUrls: ['./scheme-rules.component.scss']
})
export class SchemeRulesComponent implements OnInit {
  schemes: Array<Scheme> = [];
  loading: boolean;

  constructor(private serviceProvider: ServiceProviderService, public fileService: FileService) { }

  ngOnInit() {
    this.getSchemeRules();
  }

  /**
   * Fetch existing scheme rules
   */
  getSchemeRules() {
    this.loading = true;
    this.serviceProvider.getSchemeRules().subscribe((data) => {
      this.loading = false;
      this.schemes = data;
    }, error => {
      this.loading = false;
    })
  }

}
