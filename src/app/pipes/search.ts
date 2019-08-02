import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value: any, args: string): any {
    if (!value) {
      return value;
    }
    if (!args) {
      return value;
    }
    args = args.toLowerCase();
    return value.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}


