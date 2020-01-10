import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'uidLock'
})
export class UidLockPipe implements PipeTransform {

  transform(value: any, args?: any): Boolean {
    let returnValue = false;
    const time_configurations = JSON.parse(localStorage.getItem("mediclaimUser")).hospital.time_configuration;
    time_configurations.forEach(configuration => {
      if (configuration.scheme_id === value.scheme_id && configuration.department_id === value.department_id) {
        if (moment(value.created_at).add(configuration.uid_time, 'minutes').diff(moment.now()) >= 0) {
          returnValue = false;
        } else {
          returnValue = true;
        }
      }
    });
    if (value.department_id === 2 || value.department_id === 6) {
      returnValue = false;
    }
    return returnValue;
  }

}
