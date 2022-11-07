import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Game} from "../models/Game";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class GameService {
	// TODO Mettre la bonne Url
	url: string = "http://193.70.42.215:8000/api";
	httpOption = {
		headers: new HttpHeaders({
			'Content-type': 'application/json',
		})
	}

	constructor(private http: HttpClient) {}

	getHistory(puuid: string): Observable<Game[]> {
		return this.http.get<Game[]>(this.url+ `/game/${puuid}/history`, this.httpOption);
	}

	getGame(game_id: string): Observable<Game> {
		return this.http.get<Game>(this.url+ `/game/${game_id}`, this.httpOption);
	}
}
