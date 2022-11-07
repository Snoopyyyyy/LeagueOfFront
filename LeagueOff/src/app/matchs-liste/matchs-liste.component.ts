import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../services/game.service";
import {Game} from "../models/Game";
import {SummonerService} from "../services/summoner.service";
import {Player} from "../models/Player";
import {FixdataService} from "../services/fixdata.service";

@Component({
	selector: 'app-matchs-liste',
	templateUrl: './matchs-liste.component.html',
	styleUrls: ['./matchs-liste.component.css']
})
export class MatchsListeComponent implements OnInit {
	games?: Game[];
	name?: string;

	constructor(public Fixdata: FixdataService, private gameService: GameService,private summonerService: SummonerService, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		let name = this.route.snapshot.paramMap.get('name');
		let puuid = this.route.snapshot.paramMap.get('puuid');
		if (name && puuid) {
			this.name = name;
			this.gameService.getHistory(puuid).subscribe(games => {
				this.games = games.map(game => {
					game.currentPlayer = game.players.find(ply => ply.summonerName === this.name)!;
					return game;
				})
			});
		}
	}

}
