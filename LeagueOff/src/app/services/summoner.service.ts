import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Summoner} from "../models/Summoner";

@Injectable({
  providedIn: 'root'
})
export class SummonerService {
	// TODO Mettre la bonne Url
	url: string = "http://www.leagueoff.site:8000/api";
	httpOption = {
		headers: new HttpHeaders({
			'Content-type': 'application/json',
		})
	}

	constructor(private http: HttpClient) {}

	getSummoner(summonerName: string): Observable<Summoner> {
		return this.http.get<Summoner>(encodeURI(this.url + `/summoner/${summonerName}`), this.httpOption);
	}
}
