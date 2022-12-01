import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRange'
})
export class FilterRangePipe implements PipeTransform {

  transform(value: any[] | undefined, range: number): any[] {
    value = value ?? [];
    return value.filter(a => a.timestamp <= range).sort((a,b) => b.timestamp - a.timestamp);
  }
}
