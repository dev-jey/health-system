import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateSubtotal'
})
export class CalculateSubtotalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value)
    let subTotal = 0;
    value.forEach(item=>{
      subTotal += item.amount;
      console.log('Subtotal', subTotal)
    })
    return subTotal;
  }

}
