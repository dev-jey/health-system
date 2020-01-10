import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'claimUnlock'
})
export class ClaimUnlockPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let returnValue = false;
    if (moment(value.updated_at).add(value.claim_time, 'minutes').diff(moment.now()) >= 0) {
      returnValue = false;
    } else {
      returnValue = true;
    }
    return returnValue;
  }

}
