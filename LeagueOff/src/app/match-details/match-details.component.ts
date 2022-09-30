import {Component, OnInit} from '@angular/core';
import {FixdataService} from "../services/fixdata.service";
import {GameService} from "../services/game.service";
import {SummonerService} from "../services/summoner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Game} from "../models/Game";
import {spawn} from "child_process";

@Component({
	selector: 'app-match-details',
	templateUrl: './match-details.component.html',
	styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
	game?: Game;
	playing: boolean = false;
	gamePlayerId?: number;
	speed: number = 100;
	range: number = 0;

	map: string = "/assets/img/map/map.png";
	soulMap: string = "";
	mapSwitch: number = -1;

	kills: any[] = [];
	objective: any[] = [];


	constructor(public Fixdata: FixdataService, private gameService: GameService, private summonerService: SummonerService, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		let id = this.route.snapshot.paramMap.get('game_id');
		if (id) {
			this.gameService.getGame(id).subscribe(game => {
				this.game = game;
				this.game.events.forEach(event => {
					switch (event.type) {
						case "CHAMPION_KILL":
							this.kills.push(event);
							break;
						case "ELITE_MONSTER_KILL":
							this.objective.push(event)
							break;
					}
				});

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

				let drakes = this.objective.filter(o => o.monsterType === "DRAGON");
				drakes = drakes.map(d => {
					let id = drakes.indexOf(d);
					let before = id != 0 ? drakes[id - 1] : null;
					return {
						...d,
						"spawn": id == 0 ? 5 * 60000 : before.timestamp + (d.monsterSubType === "ELDER_DRAGON" ? 6 : 5) * 60000
					}
				})
				last = drakes[drakes.length - 1];

				this.objective = [...heralds, ...barons, ...drakes].sort((a, b) => a.timestamp - b.timestamp);
				console.log(this.objective.map(h => {
					return {
						monster: h.monsterSubType ?? h.monsterType,
						spawn: this.getTime(h.spawn).join(':'),
						kill: this.getTime(h.timestamp).join(':')
					}
				}))
				this.game.soul = drakes.length > 2 ? drakes[2].monsterSubType.replace("_DRAGON", "") : "";
				this.soulMap = "/assets/img/map/map" + this.game.soul!.toLowerCase() + ".png";
				this.mapSwitch = drakes.length > 2 ? drakes[2].timestamp : -1;
			});
		}
	}

	togglePlayPause(): void {
		this.playing = !this.playing;
		if (!this.playing) {
			window.clearInterval(this.gamePlayerId);
			console.log('clear')
		} else {
			this.gamePlayerId = window.setInterval(() => {
				if (this.range <= this.game!.duration * 1000 - this.speed) {
					this.range += this.speed;
				} else if (this.range < this.game!.duration * 1000) {
					this.range = this.game!.duration * 1000;
				} else {
					this.playing = false;
					window.clearInterval(this.gamePlayerId);
					console.log('clear')
				}
				this.range++;
			}, 1);
		}
	}

	getTime(timestamp: number): string[] {
		let second = Math.round(timestamp / 1000);
		let secRest = second % 60;
		let minutes = (second - secRest) / 60
		return [
			(minutes > 9 ? `` : '0') + minutes,
			(secRest > 9 ? `` : '0') + secRest
		];
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
}
