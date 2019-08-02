import { Pipe, PipeTransform } from '@angular/core';
import {TreeviewItem} from 'ngx-treeview';

@Pipe({
  name: 'pipeTree'
})
export class PipeTreePipe implements PipeTransform {
  transform(value: TreeviewItem[], args?: any): TreeviewItem[] {
    console.log(value);
    let item: Array<TreeviewItem> = [];
    value.forEach((record) => {
      let nodo = new TreeviewItem({
        text: record.text, value: record.value, children: record.children
      });
      item.push(nodo);
    });
    return  value;
  }
}
