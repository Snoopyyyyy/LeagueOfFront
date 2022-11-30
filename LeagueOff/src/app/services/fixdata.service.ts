import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class FixdataService {
	url = "";
	summonerSpellName: any = {};
	runeIconsName: any = {};
	itemsData: any = {};
	version = "";

	constructor(private http: HttpClient) {
		http.get<string[]>("https://ddragon.leagueoflegends.com/api/versions.json").subscribe(versions => {
			this.version = versions[0];
			console.log('update');

			http.get<any>("https://ddragon.leagueoflegends.com/cdn/"+this.version+"/data/fr_FR/summoner.json").subscribe(data => {
				for(let name in data.data) {
					let sum = data.data[name];
					this.summonerSpellName[sum.key] = sum.image.full;
				}
			})

			http.get<any[]>("https://ddragon.leagueoflegends.com/cdn/"+this.version+"/data/fr_FR/runesReforged.json").subscribe(data => {
				for(let rune of data) {
					this.runeIconsName[rune.id+""] = rune.icon;
				}
			})

			http.get<any>("https://ddragon.leagueoflegends.com/cdn/"+this.version+"/data/fr_FR/item.json").subscribe(data => {
				for(let item in data.data) {
					this.itemsData[item.toString()] = data.data[item.toString()];
				}
			})
		});
	}

	getChampionIcon(championName: string): string {
		return "https://ddragon.leagueoflegends.com/cdn/"+this.version+"/img/champion/"+(championName === "FiddleSticks" ? "Fiddlesticks" : championName) +".png";
	}

	getSummonerIcon(iconId: number | undefined = 0): string {
		return "http://ddragon.leagueoflegends.com/cdn/" + this.version + "/img/profileicon/" + iconId + ".png";
	}

	getItemIcon(itemId: number): string {
		if (itemId == 0) return "";
		return "https://ddragon.leagueoflegends.com/cdn/"+this.version+"/img/item/"+itemId+".png";
	}

	getRuneIcon(runeId: number): string {
		return "https://ddragon.canisback.com/img/"+this.runeIconsName[runeId];
	}

	getSummonerSpellIcon(summonerId: number): string {
		return "https://ddragon.leagueoflegends.com/cdn/"+this.version+"/img/spell/"+this.summonerSpellName[summonerId];
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

	getItem(itemId: number|string): any {
		return this.itemsData[itemId];
	}

}
