import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { ServiceProviderService } from 'src/app/_services/ServiceProvider/service-provider.service';
import { AlertService } from '../../../_services/shared/alert.service';
import { environment } from 'src/environments/environment';



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
  textLeft: string = 'Capture';
  textRight: string = 'Capture';
  loading: boolean;
  notMatched: boolean;
  errorMessage: string;
  constructor(
    private serviceProvider: ServiceProviderService,
    private ref: ChangeDetectorRef,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.clearLeftFingerPrints()
    this.clearRightFingerPrints()
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
      left_hand_fingers: this.leftFps,
      right_hand_fingers: this.rightFps,
      user_id: this.currentMember.id,
      left_finger: this.activeLeftFinger,
      right_finger: this.activeRightFinger
    };
    this.loading = true;
    this.serviceProvider
      .recordFingerprint(fpRequest)
      .subscribe((fp: any) => {
        this.loading = false;
        this.alert.fire('Success!', 'Fingerprints Recorded successfully', 'success', true, "Generate MVC").then(() =>
          this.generateMVCBiometric());
      }, (error) => {
        this.loading = false;
        this.alert.fire('Error!', 'An error occurred while saving fingerprints', 'error');
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
    return new Promise((resolve, reject) => {
      if (data.fpCount < 1) {
        resolve(true);
        return
      }
      const uri = `${environment.fingerprintUrl}SGIMatchScore`;
      let params = `template1=${data[0].ISOTemplateBase64}&template2=${data[i].ISOTemplateBase64}&licstr=&templateFormat='ISO'`
      xmlhttps.onreadystatechange = () => {
        if (xmlhttps.readyState === 4 && xmlhttps.status === 200) {
          const res = JSON.parse(xmlhttps.responseText);
          if (res.ErrorCode === 0) {
            if (res.MatchingScore < 120) {
              this.notMatched = true;
              resolve(false);
            } else {
              this.notMatched = false;
              resolve(true);
            }
          } else {
            this.notMatched = true;
            this.alert.fire('Error!', 'An error occurred while processing fingerprints', 'error', false, 'Retry', null, 1500);
            resolve(false);
            return;
          }
        } else {
          resolve(true);
        }
      }
      xmlhttps.open('POST', uri, true);
      xmlhttps.send(params);
    })
  }


  async checkLeftFingerScoreMatch(data): Promise<boolean> {
    const xmlhttps = new XMLHttpRequest();
    let i;
    if (data.fpCount === 1) { i = 1 }
    if (data.fpCount === 2) { i = 2 }
    return new Promise(async (resolve, reject) => {
      if (data.fpCount < 1) {
        resolve(true);
        return
      }
      const uri = `${environment.fingerprintUrl}SGIMatchScore`;
      let params = `template1=${this.leftFps[0].ISOTemplateBase64}&template2=${data[i].ISOTemplateBase64}&licstr=&templateFormat='ISO'`
      xmlhttps.onreadystatechange = () => {
        if (xmlhttps.readyState === 4 && xmlhttps.status === 200) {
          const res = JSON.parse(xmlhttps.responseText);
          if (res.ErrorCode === 0) {
            if (res.MatchingScore < 120) {
              this.notMatched = true;
              resolve(false);
            } else {
              this.notMatched = false;
              resolve(true);
            }
          } else {
            this.notMatched = true;
            this.alert.fire('Error!', 'An error occurred while processing fingerprints', 'error', false, 'Retry', null, 1500);
            resolve(false);
            return;
          }
        } else {
          resolve(true);
        }
      }
      xmlhttps.open('POST', uri, true);
      xmlhttps.send(params);
    })
  }

  captureLeft = async (res) => {
    this.errorMessage = '';
    this.textLeft = this.fpCount[0] === 2 ? 'Captured' : `Capture ${this.fpCount[0] + 2}`
    if (this.fpCount[0] <= 2) {
      this.leftFpBMP = `data:image/bmp;base64,${res.BMPBase64}`;
      this.leftFps[this.fpCount[0]] = { finger: this.activeLeftFinger, ...res };
      if (this.fpCount[0] >= 1) {
        this.leftFps.fpCount = this.fpCount[0]
        const matched = await this.checkFingerScoreMatch(this.leftFps);
        if (!matched) {
          this.notMatched = true;
          this.leftFps[this.fpCount[0]] = {}
          this.textLeft = 'Try Again';
          this.errorMessage = 'Fingerprints dont match';
          return;
        }
      }
      this.notMatched = false;
      this.fpCount[0] += 1;
    }
  }


  captureRight = async (res) => {
    this.errorMessage = '';
    this.textRight = this.fpCount[1] === 2 ? 'Captured' : `Capture ${this.fpCount[1] + 2}`
    if (this.fpCount[1] <= 2) {
      this.rightFpBMP = `data:image/bmp;base64,${res.BMPBase64}`;
      this.rightFps[this.fpCount[1]] = { finger: this.activeRightFinger, ...res };
      if (this.fpCount[0] >= 1) {
        this.rightFps.fpCount = this.fpCount[1]
        const matched = await this.checkFingerScoreMatch(this.rightFps);
        const matchesLeft = await this.checkLeftFingerScoreMatch(this.rightFps);
        if (matchesLeft) {
          this.notMatched = true;
          this.rightFps[this.fpCount[1]] = {}
          this.textRight = 'Try Again'
          this.alert.fire('Error!', 'Left fingerprints already captured', 'error', false, '', '', 1500);
          return;

        }
        if (!matched) {
          this.notMatched = true;
          this.textRight = 'Try Again'
          this.rightFps[this.fpCount[1]] = {}
          this.errorMessage = 'Fingerprints dont match';
          return;
        }
      }
      this.notMatched = false;
      this.fpCount[1] += 1;
    }
  }

  async captureFingerprint(hand) {
    this.errorMessage = '';
    const uri = `${environment.fingerprintUrl}SGIFPCapture`;
    const xmlhttp = new XMLHttpRequest();
    const text = 'Capturing';
    hand === 'left' ? this.textLeft = text :
      this.textRight = text;
    xmlhttp.onreadystatechange = async () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        const res = JSON.parse(xmlhttp.responseText);
        if (res.ErrorCode !== 0) {
          const message = 'Fingerprint not captured';
          const error = 'Try Again'
          hand === 'left' ? this.textLeft = error :
            this.textRight = error;
          this.alert.fire('Error!', message, 'error', false, null, null, 1500);
          return;
        }
        if (hand === 'left') {
          this.captureLeft(res)
          if (this.fpCount[0] === 2 && !this.notMatched) {
            this.alert.fire('Success!', 'You can capture fingerprints from the right hand', 'success');
          }
        } else {
          this.captureRight(res);
          if (this.fpCount[1] === 2 && !this.notMatched) {
            this.alert.fire('Success!', 'Biometric enrollment complete', 'success').then(() => {
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

  /**
   * Clear left finger prints
   */
  clearLeftFingerPrints() {
    this.leftFpBMP = 'https://www.husseygaybell.com/wp-content/uploads/2018/05/blank-white-image-1024x576.png';
    this.leftFps = new Array<any>(3);
    this.fpCount[0] = 0;
    this.textLeft = 'Capture';
  }

  /**
   * Clear Right finger prints
   */
  clearRightFingerPrints() {
    this.rightFpBMP = 'https://www.husseygaybell.com/wp-content/uploads/2018/05/blank-white-image-1024x576.png';
    this.rightFps = new Array<any>(3);
    this.fpCount[1] = 0;
    this.textRight = 'Capture';
  }
}
