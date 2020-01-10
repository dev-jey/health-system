import { Injectable } from '@angular/core';
import { ServiceProviderService } from '../ServiceProvider/service-provider.service';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private serviceProvider: ServiceProviderService) { }

  /**
   * View saved file in a new tab on the browser
   */
  async viewFile(info) {
      const file = JSON.parse(info);
      var arrBuffer = this.base64ToArrayBuffer(file.base64);
      var newBlob = new Blob([arrBuffer], { type: file.filetype });
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      var data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      document.body.appendChild(link); //required in FF, optional for Chrome
      window.open(data, '_blank');
  }


  /**
   * Convert image from base64 to array buffer
   */
  base64ToArrayBuffer(data) {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  };

}
