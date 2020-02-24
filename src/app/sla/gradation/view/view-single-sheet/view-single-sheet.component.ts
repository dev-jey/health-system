import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';

@Component({
  selector: 'app-view-single-sheet',
  templateUrl: './view-single-sheet.component.html',
  styleUrls: ['./view-single-sheet.component.scss']
})
export class ViewSingleSheetComponent implements OnInit {
  currentId: string;
  gradingDetails: any = {};
  loading: boolean;

  constructor(private serviceProvider: ServiceProviderService) { }

  ngOnInit() {
    const urlArray = window.location.href.split("/");
    const id = urlArray[urlArray.length - 1];
    this.loading = true;
    this.currentId=id;
    this.serviceProvider.getSingleGradationITem(id).subscribe((res)=>{
      this.gradingDetails = res.data;
      this.loading = false;
      console.log(this.gradingDetails)
      this.gradingDetails.gradingResponse.forEach(resp1=>{
        resp1.responsesData.responses.forEach(subresp=>{
          subresp[0].response.forEach(x=>console.log(x.text))
          console.log(subresp[0].response, '>>>>')
        })
      })
    })
  }

}
