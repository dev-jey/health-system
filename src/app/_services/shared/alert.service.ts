import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  fire = (title, text, icon?, showConfirmButton?, confirmButtonText?, confirmButtonColor?, timer?) => {
    showConfirmButton = showConfirmButton || true;
    confirmButtonText = confirmButtonText || 'OK';
    confirmButtonColor = confirmButtonColor || "#28a745";
    return Swal.fire({
      title, text, icon, showConfirmButton, confirmButtonColor, confirmButtonText, timer,
      showClass: {
        popup: 'animated fadeIn faster'
      },
      hideClass:{
        popup: 'animated fadeOut faster'
      },
      customClass: {
        confirmButton: icon === 'error' ? 'btn btn-danger' : icon === 'info' ? 'btn btn-info': 'btn btn-success',
        cancelButton: 'btn btn-dark'
      },
      buttonsStyling: false
    })
  }
}
