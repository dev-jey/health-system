import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "calculateAge"
})
/**
 * A Pipe to mask phone numbers of members
 */
export class calculateAge implements PipeTransform {
  transform(value: string): any {
    if (!value) {
      return "";
    }
    var today = new Date();
    var birthDate = new Date(value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
