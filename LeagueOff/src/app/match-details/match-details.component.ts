import {Component, OnInit} from '@angular/core';
import {FixdataService} from "../services/fixdata.service";
import {GameService} from "../services/game.service";
import {SummonerService} from "../services/summoner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../models/Game";
import {spawn} from "child_process";
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

	map: string = "/assets/img/map/map.png";
	soulMap: string = "";
	mapSwitch: number = -1;

	selectedEvent?: any;
	kills: any[] = [];
	objective: any[] = [];
	gameItems!: GameItem[][];

	posts: string[] = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];
	teamPlayer: any[] = [];

	constructor(public Fixdata: FixdataService, private gameService: GameService, private summonerService: SummonerService, private router: Router, private route: ActivatedRoute) {

	}

	ngOnInit(): void {
		let id = this.route.snapshot.paramMap.get('game_id');
		if (id) {
			this.gameService.getGame(id).subscribe(game => {
				this.game = game;

				let team1 = this.game.players.filter(p => p.teamId === 100);
				let team2 = this.game.players.filter(p => p.teamId === 200);

				for (let post of this.posts) {
					this.teamPlayer.push({
						poser: post,
						team1: team1.find(p => p.post == post),
						team2: team2.find(p => p.post == post),
					})
				}

				let rawItems: any[] = [];
				this.game.events.forEach(event => {
					switch (event.type) {
						case "CHAMPION_KILL":
							this.kills.push(event);
							break;
						case "ELITE_MONSTER_KILL":
							this.objective.push(event)
							break
						case "ITEM_PURCHASED":
						case "ITEM_SOLD":
						case "ITEM_DESTROYED":
							rawItems.push(event);
							break;
					}
				});
				let heralds = this.getHeralds();
				let barons = this.getNashor();
				let drakes = this.getDrakes();

				this.objective = [...heralds, ...barons, ...drakes].sort((a, b) => a.timestamp - b.timestamp);
				this.game.soul = drakes.length > 2 ? drakes[2].monsterSubType.replace("_DRAGON", "") : "";
				this.soulMap = "/assets/img/map/map" + this.game.soul!.toLowerCase() + ".png";
				this.mapSwitch = drakes.length > 2 ? drakes[2].timestamp : -1;

				this.gameItems = this.getItems(rawItems);
			});
		}
	}

	private getHeralds(): any[] {
		let heralds = this.objective.filter(o => o.monsterType === "RIFTHERALD");
		if (!heralds.length) {
			heralds.push({
				"type": "ELITE_MONSTER_IGNORE",
				"bounty": 0,
				"killerId": 0,
				"spawn": 8 * 60000,
				"position": {
					"x": 5007,
					"y": 10471
				},
				"timestamp": 19 * 60000 + 50000,
				"monsterType": "RIFTHERALD",
				"killerTeamId": 0
			})
		}
		heralds = heralds.map(h => {
			let id = heralds.indexOf(h);
			let before = id != 0 ? heralds[id - 1] : null;

			return {
				...h,
				"spawn": id == 0 ? 8 * 60000 : before.timestamp + 6 * 60000,
				"position": {
					"x": 5007,
					"y": 10471
				},
			}

		});
		let last = heralds[heralds.length - 1];
		if (last.timestamp + 6 * 60000 < 19 * 60000 + 50000) {
			heralds.push({
				"type": "ELITE_MONSTER_IGNORE",
				"bounty": 0,
				"killerId": 0,
				"spawn": last.timestamp + 6 * 60000,
				"position": {
					"x": 5007,
					"y": 10471
				},
				"timestamp": 19 * 60000 + 50000,
				"monsterType": "RIFTHERALD",
				"killerTeamId": 0
			});
		}
		return heralds
	}

	private getNashor(): any[] {
		let barons = this.objective.filter(o => o.monsterType === "BARON_NASHOR");
		barons = barons.map(b => {
			let id = barons.indexOf(b);
			let before = id != 0 ? barons[id - 1] : null;

			return {
				...b,
				"spawn": id == 0 ? 20 * 60000 : before.timestamp + 7 * 60000,
				"position": {
					"x": 5007,
					"y": 10471
				},
			}
		});
		let last = barons[barons.length - 1];
		if (last) {
			if (last.timestamp + 6 * 60000 < this.game!.duration * 1000) {
				barons.push({
					"type": "ELITE_MONSTER_KILL",
					"bounty": 0,
					"killerId": 0,
					"position": {
						"x": 5007,
						"y": 10471
					},
					"timestamp": this.game!.duration * 1001,
					"monsterType": "BARON_NASHOR",
					"killerTeamId": 0,
					"assistingParticipantIds": [],
					"spawn": last.timestamp + 6 * 60000
				})
			}
		}
		return barons;
	}

	private getDrakes(): any[] {
		let drakes = this.objective.filter(o => o.monsterType === "DRAGON");
		drakes = drakes.map(d => {
			let id = drakes.indexOf(d);
			let before = id != 0 ? drakes[id - 1] : null;
			return {
				...d,
				"spawn": id == 0 ? 5 * 60000 : before.timestamp + (d.monsterSubType === "ELDER_DRAGON" ? 6 : 5) * 60000
			}
		})
		let drakesByTeam = [drakes.filter(d => d.killerTeamId === 100), drakes.filter(d => d.killerTeamId === 200)]
		let last = drakes[drakes.length - 1];
		if (last.timestamp + ((last.monsterSubType === "ELDER_DRAGON" || drakesByTeam[0].length > 4 || drakesByTeam[1].length > 4) ? 6 : 5) * 60000 < this.game!.duration * 1000) {
			console.log('last drake not killed')
		}
		return drakes;
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

	getObjectiveIcon(objectif: string): string {
		const icon: any = {
			"BARON_NASHOR": "baron_minimap_icon.png",
			"RIFTHERALD": "sru_riftherald_minimap_icon.png",
			"AIR_DRAGON": "dragonairminimap.png",
			"FIRE_DRAGON": "dragonfireminimap.png",
			"EARTH_DRAGON": "dragonearthminimap.png",
			"WATER_DRAGON": "dragonwaterminimap.png",
			"HEXTECH_DRAGON": "dragonhextechminimap.png",
			"ELDER_DRAGON": "dragonelderminimap.png"
		};
		return "https://raw.communitydragon.org/12.18/game/assets/ux/minimap/icons/" + icon[objectif];
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
			if (number > 0) {
				this.range = this.range < (this.game.duration * 1000 - 100 * this.speed) ? this.range + 100 * this.speed : this.game.duration * 1000
			} else {
				this.range = this.range > 100 * this.speed ? this.range - 100 * this.speed : 0
			}
		}
	}

	animationDelay = 5000;

	getOpacity(): string {
		if (this.mapSwitch != -1) {
			if (this.mapSwitch < this.range) {
				return this.range > this.mapSwitch + this.animationDelay ? '1' : "" + ((this.range - this.mapSwitch) / this.animationDelay);
			}
		}
		return "0";
	}

	getPlayer(killerId: number): Player {
		return this.game!.players.find(p => p.participantId === killerId)!;
	}

	getPlayerByPost(post: string): Player[] {
		return this.game!.players.filter(p => p.post === post)!.sort((a, b) => a.teamId! - b.teamId!);
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

	getWard(participantId: number): string {
		return "0";
	}
}
