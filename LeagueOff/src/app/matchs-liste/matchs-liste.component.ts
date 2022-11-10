import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../services/game.service";
import {Game} from "../models/Game";
import {SummonerService} from "../services/summoner.service";
import {FixdataService} from "../services/fixdata.service";
import { Player } from '../models/Player';
import { Team } from '../models/Team';
import { Summoner } from '../models/Summoner';

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
		let stat = {
			win: this.showGames?.filter(g => g.currentPlayer.win),
			loose: this.showGames?.filter(g => !g.currentPlayer.win),
		}
		this.statistique = stat;
	}

	changeFilter(mode: string) {
		this.gameModeFilter = mode;
		let gameMode = mode ? new RegExp(mode) : new RegExp('.*');
		this.showGames = this.games?.filter(g => g.gameMode.match(gameMode));
		this.reloadStat();
	}
}
