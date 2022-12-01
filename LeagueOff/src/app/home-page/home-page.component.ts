import {Component, OnInit} from '@angular/core';
import {SummonerService} from "../services/summoner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FixdataService} from "../services/fixdata.service";

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
	region: string = "";
	summonerName: string = "";
	error: string = "";

	constructor(public _iconService: FixdataService, private _summonerService: SummonerService, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
	}

	setRegion(): void {

	}

	submit(): void {
		console.log(this.region, this.summonerName)
		this.error = "";
		if(this.region != "" && this.summonerName != "") {
			this._summonerService.getSummoner(this.summonerName).subscribe({
				next: (summoner) => {
					if (summoner.puuid != "") {
						this.router.navigateByUrl(`/game/${summoner.name}/history`);
					} else {
						this.error = "No summoner found"
					}
				},
				error: () => {
					this.error = "No summoner found"
				}
			})
		}else{
			this.error = "All field is required"
		}
	}

}
