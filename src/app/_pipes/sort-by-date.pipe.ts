import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.sort((a, b) => {
      const date1 = new Date(a.created_at)
      const date2 = new Date(b.created_at);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
    });
  }

  transformGrading(value: any, args?: any): any {
    return value.sort((a, b) => {
      const date1 = new Date(a.grading_date)
      const date2 = new Date(b.grading_date);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
    });
  }

}
