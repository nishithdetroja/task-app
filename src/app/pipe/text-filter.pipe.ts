import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interface/task';
@Pipe({
  name: 'textFilter'
})
export class TextFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((item: Task) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}
