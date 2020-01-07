import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'calculateAge'
})
/**
 * A Pipe to mask phone numbers of members
 */
export class calculateAge implements PipeTransform {
    transform(value: string): any {
        if (!value) {
            return '';
        } // birthday is a date
        return new Date().getFullYear() - new Date(value).getFullYear();
    }
}
