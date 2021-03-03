import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DoneNotYet'
})
export class DoneNotYetPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    return value ? "Done" : "Not Yet";
  }

}
