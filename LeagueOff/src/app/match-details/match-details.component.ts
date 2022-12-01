import {Component, OnInit} from '@angular/core';
import {FixdataService} from "../services/fixdata.service";
import {GameService} from "../services/game.service";
import {SummonerService} from "../services/summoner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Game, POST} from "../models/Game";
import {Player} from "../models/Player";
import {GameItem} from "../models/GameItem";

@Component({
	selector: 'app-match-details',
	templateUrl: './match-details.component.html',
	styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
	game?: Game;
	playing: boolean = false;
	gamePlayerId?: number;
	speed: number = 10;
	range: number = 0;

	selectedEvent?: any;
	gameItems!: GameItem[][];

	posts: string[] = [POST.TOP, POST.JUNGLE, POST.MIDDLE, POST.BOTTOM, POST.UTILITY];

	constructor(public Fixdata: FixdataService, private gameService: GameService, private summonerService: SummonerService, private router: Router, private route: ActivatedRoute) {

	}

	select(event: any) {
		if(event.timestamp > this.range) return;
		this.selectedEvent = !this.isSelected(event) ? event : undefined
	}

	ngOnInit(): void {
		let id = this.route.snapshot.paramMap.get('game_id');
		if (id) {
			this.gameService.getGame(id).subscribe((game) => {
				this.game = new Game(game);

				let rawItems: any[] = [];

				this.game.events.forEach(event => {
					switch (event.type) {
						case "ITEM_PURCHASED":
						case "ITEM_SOLD":
						case "ITEM_DESTROYED":
							rawItems.push(event);
							break;
					}
				});
				this.gameItems = this.getItems(rawItems);
			});
		}
	}

	private getItems(rawItems: any[]): GameItem[][] {
		let items: GameItem[][] = [[], [], [], [], [], [], [], [], [], []]; // event par joueur
		rawItems.forEach(item => {
			let clearItem = this.Fixdata.getItem(item.itemId);
			items[item.participantId-1].push(new GameItem(item.itemId, clearItem.stack != undefined ));
		})
		return items;
	}

	isSelected(event: any): boolean {
		return this.selectedEvent && this.selectedEvent.type === event.type &&
			this.selectedEvent.victimId === event.victimId &&
			this.selectedEvent.killerId === event.killerId &&
			this.selectedEvent.timestamp === event.timestamp;
	}

	togglePlayPause(): void {
		this.playing = !this.playing;
		if (!this.playing) {
			window.clearInterval(this.gamePlayerId);
			this.playing = false;
		} else {
			this.gamePlayerId = window.setInterval(() => {
				if (this.range <= this.game!.duration * 1000 - this.speed) {
					this.range += this.speed;
				} else if (this.range < this.game!.duration * 1000) {
					this.range = this.game!.duration * 1000;
				} else {
					this.playing = false;
					window.clearInterval(this.gamePlayerId);
				}
				this.range++;
			}, 1);
		}
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
			"BARON_NASHOR": "baron_minimap_icon.png",
			"RIFTHERALD": "sru_riftherald_minimap_icon.png",
			"AIR_DRAGON": "dragonairminimap.png",
			"FIRE_DRAGON": "dragonfireminimap.png",
			"EARTH_DRAGON": "dragonearthminimap.png",
			"WATER_DRAGON": "dragonwaterminimap.png",
			"HEXTECH_DRAGON": "dragonhextechminimap.png",
			"CHEMTECH_DRAGON": "dragonchemtechmini.png",
			"ELDER_DRAGON": "dragonelderminimap.png"
		};
		return "https://raw.communitydragon.org/latest/game/assets/ux/minimap/icons/" + icon[objectif];
	}

	nextSpeed() {
		this.speed *= 10;
		if (this.speed > 1000) {
			this.speed = 10;
		} else if (this.speed > 100) {
			this.speed = 600;
		}
	}

	setRange(number: number) {
		if (this.game) {
			console.log(this.range);
			if (number > 0) {
				this.range = this.range < (this.game.duration * 1000 - 100 * this.speed) ? this.range + 100 * this.speed : this.game.duration * 1000
			} else {
				this.range = this.range > 100 * this.speed ? this.range - 100 * this.speed : 0
			}
			console.log(this.range);
		}
	}

	animationDelay = 5000;

	getOpacity(): string {
		if (this.game!.mapSwitch != -1) {
			if (this.game!.mapSwitch < this.range) {
				return this.range > this.game!.mapSwitch + this.animationDelay ? '1' : "" + ((this.range - this.game!.mapSwitch) / this.animationDelay);
			}
		}
		return "0";
	}

	getTeamKill(teamId: number) {
		let rawKills = document.querySelectorAll(".kteam-"+teamId+".visible-true");
		let kill =  rawKills.length;
		return kill + "";
	}

	getKDA(participantId: number): string {
		let rawKills = document.querySelectorAll(".kill-"+participantId+".visible-true");
		let rawDeaths = document.querySelectorAll(".victim-"+participantId+".visible-true");
		let rawAssist = document.querySelectorAll(".assist-"+participantId+".visible-true");

		let kills = rawKills.length;
		let deaths = rawDeaths.length;
		let assists = rawAssist.length;

		return `${kills}/${deaths}/${assists}`;
	}

	getTeamTower(teamId: number): number {
		let towers = document.querySelectorAll(".team-"+teamId+".visible-true.type-TOWER_BUILDING");
		return towers.length;
	}

	getWard(participantId: number): string {
		return "0";
	}
}
