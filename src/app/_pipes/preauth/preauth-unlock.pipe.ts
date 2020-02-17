import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'preauthUnlock'
})
export class PreauthUnlockPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let returnValue = false;
    if (moment(value.updated_at).add(value.preauth_time, 'minutes').diff(moment.now()) >= 0) {
      returnValue = false;
    } else {
      returnValue = true;
    }
    return returnValue;
  }

}
