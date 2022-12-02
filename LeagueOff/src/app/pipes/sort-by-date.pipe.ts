import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/Game';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: Game[] | undefined): Game[] {
    value = value ?? [];
    return value.sort((a: any, b: any) => {
      return new Date(b.date.date).getTime() - new Date(a.date.date).getTime();
    });
  }
}
