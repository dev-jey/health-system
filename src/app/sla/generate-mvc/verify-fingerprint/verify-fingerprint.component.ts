import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { AlertService } from 'src/app/_services/shared/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verify-fingerprint',
  templateUrl: './verify-fingerprint.component.html',
  styleUrls: ['./verify-fingerprint.component.scss']
})
export class VerifyFingerprintComponent implements OnInit {
  @Output() hideBiometric = new EventEmitter();
  @Output() generateMVCAfterFP = new EventEmitter();
  @Input() member: any;
  fpBMP: string;
  text: string = 'Capture'
  matched: boolean;
  activeLeftFinger: string | number;
  activeRightFinger: string | number;

  constructor(
    private ref: ChangeDetectorRef,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.activeLeftFinger = this.member.biometrics[0].finger_id;
    this.activeRightFinger = this.member.biometrics[3].finger_id;
    this.fpBMP = 'https://www.husseygaybell.com/wp-content/uploads/2018/05/blank-white-image-1024x576.png';
  }

  compareBiometrics(res): Promise<boolean> {
    const xmlhttp = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      this.member.biometrics.forEach(record => {
        const uri = `${environment.fingerprintUrl}SGIMatchScore`;
        const payload = `template1=${res.ISOTemplateBase64}&template2=${record.TemplateBase64}&lictsr=&templateFormat=ISO`;
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const res = JSON.parse(xmlhttp.responseText);
            if (res.ErrorCode === 0) {
              if (res.MatchingScore > 120) {
                resolve(true);
                return;
              } else {
                reject();
              }
            }
          }
        }
        xmlhttp.onerror = () => {
          reject()
        }
        xmlhttp.open('POST', uri, true);
        xmlhttp.send(payload);
      })

    });
  }
  async captureBiometric() {
    const uri = `${environment.fingerprintUrl}SGIFPCapture`;
    const xmlhttp = new XMLHttpRequest();
    this.text = 'Capturing';
    xmlhttp.onreadystatechange = async () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        const res = JSON.parse(xmlhttp.responseText);
        if (res.ErrorCode !== 0) {
          const message = 'Fingerprint not captured';
          this.alert.fire('Error!', message, 'error', false, null, null, 1500);
          this.text = "Capture";
          return;
        }
        this.fpBMP = `data:image/png;base64,${res.BMPBase64}`;
        this.ref.detectChanges();
        this.compareBiometrics(res).then((matched) => {
          this.text = "Capture";
          this.alert.fire('Success!', 'Member Successfully Verified', 'success', true, "Generate MVC").then(() => {
            this.generateMVCAfterFP.emit()
          });
          this.ref.detectChanges();
        }, () => {
          this.fpBMP = 'https://www.husseygaybell.com/wp-content/uploads/2018/05/blank-white-image-1024x576.png';
          this.text = "Fingerprints dont match. Try Again";
          this.alert.fire('Error!', this.text, 'error', false, null, null, 1500);
          this.ref.detectChanges();
        });
      }
    };

    let params = 'Timeout=' + '10000';
    params += '&Quality=' + '50';
    params += '&licstr=';
    params += '&templateFormat=' + 'ISO';
    xmlhttp.open('POST', uri, true);
    xmlhttp.send(params);
  }

}
