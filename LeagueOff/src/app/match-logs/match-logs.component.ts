import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/Game';

@Component({
  selector: 'app-match-logs',
  templateUrl: './match-logs.component.html',
  styleUrls: ['./match-logs.component.css']
})
export class MatchLogsComponent implements OnInit {

  @Input() game!: Game;
  @Input() range!: number;

  events: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.events = [...this.game.killEvent, ...this.game.buildings, ...this.game.objectiveEvent].sort((a: any, b: any) => {
      return b.timestamp - a.timestamp;
    });
  }
}
