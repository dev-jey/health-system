import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-fingerprint-modal',
  templateUrl: './fingerprint-modal.component.html',
  styleUrls: ['./fingerprint-modal.component.scss']
})
export class FingerprintModalComponent implements OnInit {
  @Output() closeFingerPrint = new EventEmitter();
  @Output() generateMVCAfterFP = new EventEmitter();
  @Input() completedCapturing: boolean;
  @Input() currentSchemeId: string;
  @Input() currentMember: any;
  leftFpBMP: string;
  rightFpBMP: string;
  leftFps: any;
  rightFps: any;
  fpCount = [0, 0];
  activeLeftFinger: string | number;
  activeRightFinger: string | number;
  fpMatchStatus = [];
  filteredPatients: any;
  textLeft: string = 'Begin Capture';
  textRight: string = 'Begin Capture';
  loading: boolean;
  notMatched: boolean;
  constructor(private serviceProvider: ServiceProviderService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.leftFpBMP = 'https://www.husseygaybell.com/wp-content/uploads/2018/05/blank-white-image-1024x576.png';
    this.rightFpBMP = 'https://www.husseygaybell.com/wp-content/uploads/2018/05/blank-white-image-1024x576.png';
    this.leftFps = new Array<any>(3);
    this.rightFps = new Array<any>(3);
    this.fpCount = [0, 0];
  }

  closeFingerPrintModal() {
    this.closeFingerPrint.emit();
  }

  generateMVCBiometric() {
    this.generateMVCAfterFP.emit()
  }

  enrollPatient() {
    const fpRequest = {
      scheme_id: parseInt(this.currentSchemeId),
      left_hand_fingers:this.leftFps,
      right_hand_fingers:this.rightFps,
      user_id: this.currentMember.id,
      left_finger: this.activeLeftFinger,
      right_finger: this.activeRightFinger
    };
    this.loading = true;
    this.serviceProvider
      .recordFingerprint(fpRequest)
      .subscribe((fp: any) => {
        this.loading = false;
        Swal.fire({ text: 'Fingerprints Recorded successfully', icon: 'success', confirmButtonColor:"#28a745", confirmButtonText:"Generate MVC" }).then(()=>
        this.generateMVCBiometric());
      },(error)=>{
        this.loading = false;
        Swal.fire({ text: 'An error occurred while saving fingerprints', icon: 'error' });
      })
  }

  getFingerNo(id) {
    if (id.startsWith('right')) {
      return this.activeRightFinger = id.split('-')[1];
    } else {
      return this.activeLeftFinger = id.split('-')[1];
    }
  }

  async checkFingerScoreMatch(data): Promise<boolean> {
    const xmlhttps = new XMLHttpRequest();
    let i;
    if (data.fpCount === 1) { i = 1 }
    if (data.fpCount === 2) { i = 2 }
    return new Promise(async (resolve, reject) => {
      if (data.fpCount < 1) {
        resolve(true);
        return
      }
      const uri = 'https://localhost:8443/SGIMatchScore';
      let params = `template1=${data[0].ISOTemplateBase64}&template2=${data[i].ISOTemplateBase64}&licstr=&templateFormat='ISO'`
      xmlhttps.open('POST', uri, true);
      xmlhttps.send(params);
      xmlhttps.onreadystatechange = () => {
        if (xmlhttps.readyState === 4 && xmlhttps.status === 200) {
          const res = JSON.parse(xmlhttps.responseText);
          if (res.ErrorCode === 0) {
            if (res.MatchingScore < 1) {
              resolve(false);
            } else {
              resolve(true);
            }
          } else {
            Swal.fire({ text: 'An error occurred while processing fingerprints', showConfirmButton: false, timer: 1500, icon: 'error' }); return;
          }
        }
      }
    })
  }

  captureLeft = async (res) => {
    this.textLeft = this.fpCount[0] === 2 ? 'Captured' : `Capture ${this.fpCount[0] + 2}`
    if (this.fpCount[0] <= 2) {
      this.leftFps[this.fpCount[0]] = { finger: this.activeLeftFinger, ...res };
      if (this.fpCount[0] >= 1) {
        this.leftFps.fpCount = this.fpCount[0]
        const matched = await this.checkFingerScoreMatch(this.leftFps);
        if (!matched) {
          this.notMatched = true;
          this.textLeft = 'Try Again'
          Swal.fire({ text: 'Fingerprints dont match', showConfirmButton: false, timer: 1500, icon: 'error' }); return;
        }
      }
      this.notMatched = false;
      this.leftFpBMP = `data:image/bmp;base64,${res.BMPBase64}`;
      this.fpCount[0] += 1;
    }
  }


  captureRight = async (res) => {
    this.textRight = this.fpCount[1] === 2 ? 'Captured' : `Capture ${this.fpCount[1] + 2}`
    if (this.fpCount[1] <= 2) {
      this.rightFps[this.fpCount[1]] = { finger: this.activeRightFinger, ...res };
      if (this.fpCount[0] >= 1) {
        this.rightFps.fpCount = this.fpCount[1]
        const matched = await this.checkFingerScoreMatch(this.rightFps);
        if (!matched) {
          this.notMatched = true;
          this.textRight = 'Try Again'
          Swal.fire({ text: 'Fingerprints dont match', showConfirmButton: false, timer: 1500, icon: 'error' }); return;
        }
      }
      this.notMatched = false;
      this.rightFpBMP = `data:image/bmp;base64,${res.BMPBase64}`;
      this.fpCount[1] += 1;
    }
  }

  async captureFingerprint(hand) {
    const uri = 'https://localhost:8443/SGIFPCapture';
    const xmlhttp = new XMLHttpRequest();
    const text = 'Place Your finger on the Machine';
    if (hand === 'left') {
      this.textLeft = text;
    } else {
      this.textRight = text;
    }
    xmlhttp.onreadystatechange = async () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        const res = JSON.parse(xmlhttp.responseText);
        if (res.ErrorCode !== 0) {
          const message = 'Fingerprint not captured';
          const error = 'Try Again'
          if (hand === 'left') {
            this.textLeft = error;
          } else {
            this.textRight = error;
          }
          Swal.fire({ text: message, showConfirmButton: false, timer: 1500, icon: 'error' });
          return;
        }
        if (hand === 'left') {
          this.captureLeft(res)
          if (this.fpCount[0] === 2 && !this.notMatched) {
            Swal.fire({ text: 'You can capture fingerprints from the right hand', icon: 'success' });
          }
        } else {
          this.captureRight(res);
          if (this.fpCount[1] === 2 && !this.notMatched) {
            Swal.fire({ text: 'Biometric enrollment complete', icon: 'success' }).then(() => {
              this.completedCapturing = true
            });
          }
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