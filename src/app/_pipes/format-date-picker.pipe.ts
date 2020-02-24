import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatePicker'
})
export class FormatDatePickerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      var offsetMs = value.getTimezoneOffset() * 60000;
      return new Date(value.getTime() - offsetMs);
      }
}
