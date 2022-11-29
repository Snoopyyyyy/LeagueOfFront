import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../services/game.service";
import {Game} from "../models/Game";
import {SummonerService} from "../services/summoner.service";
import {FixdataService} from "../services/fixdata.service";
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { Summoner } from '../models/Summoner';
import { KeyValue } from '@angular/common';

@Component({
	selector: 'app-matchs-liste',
	templateUrl: './matchs-liste.component.html',
	styleUrls: ['./matchs-liste.component.css']
})
export class MatchsListeComponent implements OnInit {
	games?: Game[];
	showGames?: Game[];

	name?: string;
	region: string = "";
	summonerName: string = "";
	summoner?: Summoner;
	error: string = "";
	statistique: any = {};
	gameModeFilter: string = '';
	
	constructor(public Fixdata: FixdataService, private gameService: GameService, private summonerService: SummonerService, private router: Router, private route: ActivatedRoute, private _summonerService: SummonerService) {
	}
	
	ngOnInit(): void {
		let name = this.route.snapshot.paramMap.get('name');
		this.name = name!;
		this.summonerService.getSummoner(name!).subscribe((summoner) => {
			this.summoner = summoner;
			this.gameService.getHistory(summoner.puuid).subscribe(games => {
				this.games = games.map(game => {
					game.currentPlayer = game.players.find(ply => ply.summonerName === this.name)!;
					return new Game(game);
				})
				this.showGames = [...this.games];
				this.reloadStat();
			});
		});
	}
	
	submit(): void {
		console.log(this.region, this.summonerName)
		this.error = "";
		if (this.region != "" && this.summonerName != "") {
			this._summonerService.getSummoner(this.summonerName).subscribe((summoner) => {
				if (summoner.puuid != "") {
					this.router.navigate([`/game/${summoner.name}/${summoner.puuid}`]);
				} else {
					this.error = "No summoner found"
				}
			})
		} else {
			this.error = "All field is required"
		}
	}
	
	getTime(second: number): string {
		let res = second % 60;
		let secStr = (res < 10 ? "0" : "") + res;
		let minutes = (second - res) / 60;
		let minStr = (minutes < 10 ? "0" : "") + minutes;
		
		return `${minStr}:${secStr}`;
	}
	
	getDate(date: any): string {
		let newDate = new Date(date.date);
		let day = String(newDate.getDate()).padStart(2, '0');;
		let month = String(newDate.getMonth()).padStart(2, '0');
		let year = newDate.getFullYear();
		return [day, month, year].join('/');
	}
	
	getItem(ply: Player, slot: number): number {
		let json = JSON.parse(JSON.stringify(ply));
		return json["item" + slot];
	}
	
	getKda(game: Game): number {
		let kda = (game.currentPlayer.kills! + game.currentPlayer.assists!) / game.currentPlayer.deaths!
		return Math.round(kda * 100) / 100;
	}
	
	getPlayersFromTeam(team: Team): Player[] {
		return Object.values(team.players);
	}

	getPourCent(value: number): number {
		return Math.round((value *100 / (this.showGames?.length ?? 0)) * 100) / 100
	}

	reloadStat() {
		let champs: any = {};
		let stat = {
			win: this.showGames?.filter(g => g.currentPlayer.win),
			loose: this.showGames?.filter(g => !g.currentPlayer.win),
			champs: {}
		}

		for (let game of this.showGames ?? []) {
			let key = game.currentPlayer.championName!;
			if (champs[key]) {
				champs[key].nb_game += 1;
				champs[key].cs += game.currentPlayer.cs!;
				champs[key].kill += game.currentPlayer.kills ?? 0;
				champs[key].assists += game.currentPlayer.assists ?? 0;
				champs[key].deaths += game.currentPlayer.deaths ?? 0;
				champs[key].win += + (game.currentPlayer.win ?? false);
				champs[key].loose += + !(game.currentPlayer.win ?? false);
			} else {
				champs[key] = {
					name: game.currentPlayer.championName ?? "",
					nb_game: 1,
					cs: game.currentPlayer.cs ?? 0,
					kill: game.currentPlayer.kills ?? 0,
					assists: game.currentPlayer.assists ?? 0,
					deaths: game.currentPlayer.deaths ?? 0,
					win: + (game.currentPlayer.win ?? false),
					loose: + !(game.currentPlayer.win ?? false),
				};
			}	
		}

		for (let champName in champs) {
			champs[champName].cs = Math.round((champs[champName].cs / champs[champName].nb_game) * 100) / 100;
			champs[champName].kill = Math.round((champs[champName].kill / champs[champName].nb_game) * 100) / 100;
			champs[champName].assists = Math.round((champs[champName].assists / champs[champName].nb_game) * 100) / 100;
			champs[champName].deaths = Math.round((champs[champName].deaths / champs[champName].nb_game) * 100) / 100;
			champs[champName].win = Math.round((champs[champName].win / champs[champName].nb_game) * 10000) / 100;
			champs[champName].loose = Math.round((champs[champName].loose / champs[champName].nb_game) * 10000) / 100;
			let kda = (champs[champName].kill + champs[champName].assists) / champs[champName].deaths
			champs[champName].kda = Math.round(kda * 100) / 100;
		}

		stat.champs = champs;

		this.statistique = stat;
	}

	changeFilter(mode: string) {
		this.gameModeFilter = mode;
		let gameMode = mode ? new RegExp(mode) : new RegExp('.*');
		this.showGames = this.games?.filter(g => g.gameMode.match(gameMode));
		this.reloadStat();
	}

	onCompare(_left: KeyValue<string, any>, _right: KeyValue<string, any>): number {
		return -1;
	}
}
