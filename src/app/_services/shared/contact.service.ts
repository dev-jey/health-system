import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpService } from "../shared/http.service";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpService) { }

  contactUs(payload): Observable<any> {
    return this.http.makeMediclaimRequest('user/contact/us', 'POST', payload);
  }
}
