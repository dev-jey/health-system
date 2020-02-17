import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; 
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const newValue = moment(value).format('DD/MM/YYYY');
    return newValue;
  }

}
