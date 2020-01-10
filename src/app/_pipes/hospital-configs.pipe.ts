import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hospitalConfigs'
})
export class HospitalConfigsPipe implements PipeTransform {

  transform(value: any, args?: any): Number {
    let dept: String = value.dep_name;
    let returnValue: number = undefined;
    if (value.dep_name === 'Inpatient Follow-up') {
      dept = 'Inpatient'
    }
    if (value.scheme_id && dept) {
      const scheme_hospital = JSON.parse(localStorage.getItem("mediclaimUser")).hospital.scheme_hospital;
      scheme_hospital.forEach(scheme => {
        if (scheme.scheme_id === value.scheme_id) {
          returnValue = scheme[dept.toLowerCase().trim() + '_lock'];
        }
      });
    }
    return returnValue;
  }

}
