import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import { FileService } from 'src/app/_services/shared/file.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  contracts: Array<any> = [];
  loading: boolean;
  hospitalId: number;

  constructor(private serviceProvider: ServiceProviderService, public fileService: FileService) { }

  ngOnInit() {
    this.hospitalId = JSON.parse(localStorage.getItem("mediclaimUser")).bls_serviceprovider.hospital.scheme_hospital[0].hospital_id;
    this.getContracts();
  }

  /**
   * Fetch existing contracts for the current hospital
   */
  getContracts(){
    this.loading = true;
    this.serviceProvider.getHospitalContracts(this.hospitalId).subscribe((data)=>{
      this.loading = false;
      this.contracts = data;
    }, error=>{
      this.loading = false;
    })
  }

}
