import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import { AlertService } from 'src/app/_services/shared/alert.service';

@Component({
  selector: 'app-create-preauth',
  templateUrl: './create-preauth.component.html',
  styleUrls: ['./create-preauth.component.scss']
})
export class CreatePreauthComponent implements OnInit {
  memberData: any = {};
  loading: boolean;

  constructor(private serviceProvider: ServiceProviderService, private alert: AlertService) { }

  ngOnInit() {
    this.getPreauthDetails()
  }

  getPreauthDetails = () => {
    const urlArray = window.location.href.split("/")
    const mvc = urlArray[urlArray.length - 1];
    this.loading = true;
    this.serviceProvider.getPreauthDetails(mvc).subscribe((data) => {
      this.memberData = data;
      this.loading = false;
    }, (error)=>{
      this.loading = false;
    })
  }

}
