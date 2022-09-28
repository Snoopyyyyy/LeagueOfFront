import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class FixdataService {
	url = "";
	version = "12.18.1";

	constructor() {

	}

	getChampionIcon(championName: string): string {
		return "https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/"+championName+".png";
	}
}
