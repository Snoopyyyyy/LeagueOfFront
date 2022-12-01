import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../models/Game';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-match-logs',
  templateUrl: './match-logs.component.html',
  styleUrls: ['./match-logs.component.css']
})
export class MatchLogsComponent implements OnInit {

  @Input() game!: Game;
  @Input() range!: number;
  @Input() selected!: any;
  @Output() eventChange = new EventEmitter<any>();

  events: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.events = [...this.game.killEvent, ...this.game.buildings, ...this.game.objectiveEvent, {... this.game.events[this.game.events.length-1],timestamp: this.game.duration * 1000}];
    console.log(this.events)
    setTimeout(() => {
      this.eventChange.emit(this.game.duration*500)
      console.log('canged ')
    }, 2000);
  }

  setEvent(event: any): void {
    console.log('change')
    this.eventChange.emit(event);
  }

  isSame(b: any): boolean {
    return isEqual(this.selected, b);
  }
}
