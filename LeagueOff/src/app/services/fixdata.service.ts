import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class FixdataService {
	url = "";
	summonerSpellName: any = {};
	version = "12.18.1";

	constructor(private http: HttpClient) {
		http.get<any>("https://ddragon.leagueoflegends.com/cdn/"+this.version+"/data/fr_FR/summoner.json").subscribe(data => {
			for(let name in data.data) {
				let sum = data.data[name];
				this.summonerSpellName[sum.key] = sum.image.full;
			}
		})
	}

	getChampionIcon(championName: string): string {
		return "https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/"+championName+".png";
	}

	getItemIcon(itemId: number): string {
		return "https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/"+itemId+".png";
	}

	getRuneIcon(runeIcon: string): string {
		return "https://ddragon.canisback.com/img/perk-images/Styles/"+runeIcon+".png";
	}

	getSummonerSpellIcon(summonerId: number): string {
		return "https://ddragon.leagueoflegends.com/cdn/"+this.version+"/img/spell/"+this.summonerSpellName[summonerId];
	}
}
