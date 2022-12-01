import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByMostPlayed'
})
export class SortByMostPlayedPipe implements PipeTransform {

  transform(value: any[] | undefined): any[] {
    value = value ?? [];
    return value.sort((a: any, b: any) => {
      return b.value.nb_game - a.value.nb_game;
    });
  }
}
