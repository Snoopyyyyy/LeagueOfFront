import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../models/Game';
import { isEqual } from 'lodash';
import { FixdataService } from '../services/fixdata.service';

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
  
  constructor(public Fixdata: FixdataService) { }

  ngOnInit(): void {
    this.events = [...this.game.killEvent, ...this.game.buildings, ...this.game.objectiveEvent, {... this.game.events[this.game.events.length-1],timestamp: this.game.duration * 1000}];
  }

  setEvent(event: any): void {
    console.log('change')
    this.eventChange.emit(event);
  }

  isSame(b: any): boolean {
    return isEqual(this.selected, b);
  }

  getBuildingIcon(buildingType: string): string {
		const icon: any = {
			"TOWER_BUILDING": "icon_ui_tower_minimap.png",
			"INHIBITOR_BUILDING": "icon_ui_inhibitor_minimap_v2.png",
			"NEXUS": "icon_ui_nexus_minimap_v2.png"
		};
		return "https://raw.communitydragon.org/latest/game/assets/ux/minimap/icons/" + icon[buildingType];
	}

	getObjectiveIcon(objectif: string): string {
		const icon: any = {
			"BARON_NASHOR": "https://raw.communitydragon.org/latest/game/assets/characters/sru_baron/hud/baron_circle.png",
			"RIFTHERALD": "https://raw.communitydragon.org/latest/game/assets/characters/slime_riftherald/hud/sruriftherald_circle.png",
			"AIR_DRAGON": "https://raw.communitydragon.org/latest/game/assets/ux/announcements/dragon_circle_air.png",
			"FIRE_DRAGON": "https://raw.communitydragon.org/latest/game/assets/ux/announcements/dragon_circle_fire.png",
			"EARTH_DRAGON": "https://raw.communitydragon.org/latest/game/assets/ux/announcements/dragon_circle_earth.png",
			"WATER_DRAGON": "https://raw.communitydragon.org/latest/game/assets/ux/announcements/dragon_circle_water.png",
			"HEXTECH_DRAGON": "https://raw.communitydragon.org/latest/game/assets/ux/announcements/dragon_circle_hextech.png",
			"CHEMTECH_DRAGON": "https://raw.communitydragon.org/latest/game/assets/ux/announcements/dragon_circle_chemtech.png",
			"ELDER_DRAGON": "https://raw.communitydragon.org/latest/game/assets/characters/sru_dragon_elder/hud/dragon_circle_elder.png"
		};
		return icon[objectif];
  }
  
  getName(objectif: string): string {
    let _ = {
      "BARON_NASHOR": "le baron",
			"RIFTHERALD": "le heraut de faille",
			"AIR_DRAGON": "le dragon des nuages",
			"FIRE_DRAGON": "le dragon infernal",
			"EARTH_DRAGON": "le dragon des montagnes",
			"WATER_DRAGON": "le dragon des océans",
			"HEXTECH_DRAGON": "le dragon hextech",
			"CHEMTECH_DRAGON": "le dragon techno-chimique",
			"ELDER_DRAGON": "le dragon ancestral"
    }
		return objectif.split('_').join(' ').toLowerCase();
  }

  getBuildingName(type: string): string {
    let _: any = { "TOWER_BUILDING": "une tourelle", "INHIBITOR_BUILDING": "un inhibiteur"};
    return _[type];
  }
}
