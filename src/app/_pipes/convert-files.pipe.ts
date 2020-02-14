import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertFiles'
})
export class ConvertFilesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Promise(resolve => {
      let reader = new FileReader();
      if (value.target.files && value.target.files.length > 0) {
        let file = value.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve({
            filename: file.name,
            filetype: file.type,
            base64: (<string>reader.result).split(',')[1],
            filesize: file.size
          })
        };
      }
    })

  }

}
