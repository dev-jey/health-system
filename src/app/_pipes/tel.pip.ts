import { Pipe, PipeTransform } from '@angular/core'; 
 
@Pipe({
    name:'telFilter'
})
/**
 * A Pipe to mask phone numbers of members
 */
export class telFilter implements PipeTransform {
    transform(value:string): string{
        if (!value) {
            return '';
        }

        value = value.toString().trim().replace(/^\+/, '');
        if (value.match(/[^0-9]/)) {
            return value;
        }

        let country, city, number;

        switch (value.length) {
            case 10:
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11:
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12:
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return value;
        }

        if (country == 1) {
            country = "";
        }

        number = (number.slice(0, 4).replace(/\d/g, 'x') + '-' + number.slice(4));

        return (country + " (" + city + ") " + number).trim();
    }
}
 