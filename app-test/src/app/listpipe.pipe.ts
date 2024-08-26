import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listpipe'
})
export class ListpipePipe implements PipeTransform {

  transform(value: string): string[] {
    return value.split(',');
  }

}
