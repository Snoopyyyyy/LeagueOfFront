import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Game} from "../models/Game";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class GameService {
	// TODO Mettre la bonne Url
	url: string = "https://127.0.0.1/api/";
	httpOption = {
		headers: new HttpHeaders({
			'Content-type': 'application/json',
		})
	}

	constructor(private http: HttpClient) {}

	getHistory(region: string, puuid: string): Observable<Game[]> {
		return this.http.get<Game[]>(this.url+ `/api/game/${region}/${puuid}`, this.httpOption);
	}

	getGame(game_id: string): Observable<Game> {
		return this.http.get<Game>(this.url+ `/api/game/${game_id}`, this.httpOption);
	}
}
