import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../services/game.service";
import {Game} from "../models/Game";
import {SummonerService} from "../services/summoner.service";
import {FixdataService} from "../services/fixdata.service";
import { Player } from '../models/Player';

@Component({
	selector: 'app-matchs-liste',
	templateUrl: './matchs-liste.component.html',
	styleUrls: ['./matchs-liste.component.css']
})
export class MatchsListeComponent implements OnInit {
	games?: Game[];
	name?: string;
	region: string = "";
	summonerName: string = "";
	error: string = "";

	constructor(public Fixdata: FixdataService, private gameService: GameService,private summonerService: SummonerService, private router: Router, private route: ActivatedRoute, private _summonerService: SummonerService) {
	}

	ngOnInit(): void {
		let name = this.route.snapshot.paramMap.get('name');
		let puuid = this.route.snapshot.paramMap.get('puuid');
		if (name && puuid) {
			this.name = name;
			this.gameService.getHistory(puuid).subscribe(games => {
				this.games = games.map(game => {
					game.currentPlayer = game.players.find(ply => ply.summonerName === this.name)!;
					console.log(game.gameMode);
					return game;
				})
			});
		}
	}

	submit(): void {
		console.log(this.region, this.summonerName)
		this.error = "";
		if(this.region != "" && this.summonerName != "") {
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

}
