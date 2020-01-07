import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-fingerprint',
  templateUrl: './verify-fingerprint.component.html',
  styleUrls: ['./verify-fingerprint.component.scss']
})
export class VerifyFingerprintComponent implements OnInit {
  @Output() hideBiometric = new EventEmitter();
  @Output() generateMVCAfterFP = new EventEmitter();
  @Input() member: any = {};
  fpBMP: string;
  text: string = 'Capture'
  matched: boolean;
  activeLeftFinger: string | number;
  activeRightFinger: string | number;

  constructor(private ref: ChangeDetectorRef) {
    this.fpBMP = 'https://www.husseygaybell.com/wp-content/uploads/2018/05/blank-white-image-1024x576.png';
  }

  ngOnInit() {
    this.activeLeftFinger = this.member.biometrics[0].finger_id;
    this.activeRightFinger = this.member.biometrics[3].finger_id;
  }

  compareBiometrics(xmlhttp): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.member.biometrics.forEach(record => {
        const uri = 'https://localhost:8443/SGIMatchScore';
        const payload = `template1=${this.fpBMP}&template2=${record.ISOTemplateBase64}&lictsr=&templateFormat=ISO`;
        xmlhttp.open('POST', uri, true);
        xmlhttp.send(payload);
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const res = JSON.parse(xmlhttp.responseText);
            if (res.ErrorCode === 0) {
              if (res.MatchingScore > 1) {
                resolve(true);
              } else {
                if(this.member.biometrics.indexOf(record) === (this.member.biometrics.length - 1)){
                resolve(false)
                }
              }
            } else {
              Swal.fire({ text: 'An error occurred while processing fingerprints', showConfirmButton: false, timer: 1500, icon: 'error' }); return;
            }
          }
        }
      })

    });
  }
  async captureBiometric() {
    const uri = 'https://localhost:8443/SGIFPCapture';
    const xmlhttp = new XMLHttpRequest();
    this.text = 'Place Your finger on the Machine';
    xmlhttp.onreadystatechange = async () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        const res = JSON.parse(xmlhttp.responseText);
        if (res.ErrorCode !== 0) {
          const message = 'Fingerprint not captured';
          Swal.fire({ text: message, showConfirmButton: false, timer: 1500, icon: 'error' });
          this.text = "Capture";
          return;
        }
        this.fpBMP = res.ISOTemplateBase64;
        this.matched = await this.compareBiometrics(xmlhttp);
        if (this.matched) {
          this.text = "Capture";
          Swal.fire({ text: 'Member Successfully Verified', icon: 'success', confirmButtonText:"Generate MVC",confirmButtonColor:"#28a745" }).then(()=>{
            this.generateMVCAfterFP.emit()
          });
        } else {
          this.text = "Try Again";
          Swal.fire({ text: 'Try Again', showConfirmButton: false, timer: 1500, icon: 'error' });
        }
        this.ref.detectChanges();
      } else if (xmlhttp.status === 404) {
        console.log(xmlhttp.status);
      }
    };

    xmlhttp.onerror = () => {
      console.log(xmlhttp.status);
    };

    let params = 'Timeout=' + '10000';
    params += '&Quality=' + '50';
    params += '&licstr=';
    params += '&templateFormat=' + 'ISO';
    xmlhttp.open('POST', uri, true);
    xmlhttp.send(params);
  }

}
