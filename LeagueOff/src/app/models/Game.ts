import {Player} from "./Player";
import {Team} from "./Team";

export enum POST {
	'TOP' = "TOP",
	'JUNGLE' = 'JUNGLE',
	'MIDDLE' = 'MIDDLE',
	'BOTTOM' = 'BOTTOM',
	'UTILITY' = 'UTILITY'
}

export class Game {
	// raw
	currentPlayer!: Player;
	soul?: string;

	// api
	matchId!: number;
	surrender!: boolean;
	date!: Date;
	duration!: number;
	gameMode!: string;
	players!: Player[];
	events: any[];

	// clean
	blueTeam: Team;
	redTeam: Team;
	soulType: string;
	mapSwitch: number;
	// TODO - change Type
	killEvent!: any[];
	objectiveEvent!: any[];

	constructor(game: Game) {
		// API
		this.matchId = game.matchId;
		this.surrender = game.surrender;
		this.date = game.date;
		this.duration = game.duration;
		this.gameMode = game.gameMode;
		this.events = game.events;
		this.players = game.players;

		// Clean
		this.killEvent = [];
		this.objectiveEvent = [];
		let heralds: any[] = [];
		let nashors: any[] = [];
		let drakes: any[] = [];

		// set up team
		this.blueTeam = new Team(100, "#5281d7");
		this.redTeam = new Team(200, "#cf3a3e");

		for (const ply of game.players!) {
			if (ply.teamId == 100) {
				this.blueTeam.addPlayer(ply);
			} else {
				this.redTeam.addPlayer(ply);
			}
		}

		for (const event of game.events) {
			switch (event.type) {
				case "CHAMPION_KILL":
					event.killerTeamId = event.killerId > 5 ? 200 : 100;
					this.killEvent.push(event);
					break;
				case "ELITE_MONSTER_KILL":
					if (event.monsterType === "RIFTHERALD") heralds.push(event);
					if (event.monsterType === "BARON_NASHOR") nashors.push(event);
					if (event.monsterType === "DRAGON") drakes.push(event);
					break;
			}
		}
		// heralds
		heralds = heralds.map((herald, id) => {
			let before = id != 0 ? heralds[id - 1] : null;
			return {
				...herald,
				"spawn": id == 0 ? 8 * 60000 : before.timestamp + 6 * 60000,
				"position": {"x": 5007, "y": 10471},
			}

		});
		if (heralds.length > 0) {
			let last = heralds[heralds.length - 1];
			if (last.timestamp + 6 * 60000 < 19 * 60000 + 50000) {
				heralds.push({
					"type": "ELITE_MONSTER_IGNORE",
					"bounty": 0,
					"killerId": 0,
					"spawn": last.timestamp + 6 * 60000,
					"position": {"x": 5007, "y": 10471},
					"timestamp": 19 * 60000 + 50000,
					"monsterType": "RIFTHERALD",
					"killerTeamId": 0
				});
			}
		} else if (this.duration > 8 * 60000) {
			let max = 19 * 60000 + 50000;
			heralds.push({
				"type": "ELITE_MONSTER_IGNORE",
				"bounty": 0,
				"killerId": 0,
				"spawn": 8 * 60000,
				"position": {"x": 5007, "y": 10471},
				"timestamp": this.duration > max ? max : this.duration,
				"monsterType": "RIFTHERALD",
				"killerTeamId": 0
			})
		}

		// nashors
		nashors = nashors.map((nashor, id) => {
			let before = id != 0 ? nashor[id - 1] : null;
			return {
				...nashor,
				"spawn": id == 0 ? 20 * 60000 : before.timestamp + 7 * 60000,
				"position": {"x": 5007, "y": 10471},
			}
		});
		if (nashors.length > 0) {
			let last = nashors[nashors.length - 1];
			if (last) {
				if (last.timestamp + 6 * 60000 < this.duration * 1000) {
					nashors.push({
						"type": "ELITE_MONSTER_KILL",
						"bounty": 0,
						"killerId": 0,
						"position": {
							"x": 5007,
							"y": 10471
						},
						"timestamp": this.duration * 1001,
						"monsterType": "BARON_NASHOR",
						"killerTeamId": 0,
						"assistingParticipantIds": [],
						"spawn": last.timestamp + 6 * 60000
					})
				}
			}
		}

		// drakes
		drakes = drakes.map((drake, id) => {
			let before = id != 0 ? drakes[id - 1] : null;
			drake = {
				...drake,
				"spawn": id == 0 ? 5 * 60000 : before.timestamp + (drake.monsterSubType === "ELDER_DRAGON" ? 6 : 5) * 60000
			}
			if (drake.killerTeamId == 100) {
				this.blueTeam.drakes.push(drake);
			} else if (drake.killerTeamId == 200) {
				this.redTeam.drakes.push(drake);
			}
			return drake;
		})
		if (drakes.length > 0) {
			let last = drakes[drakes.length - 1];
			if (last.timestamp + ((last.monsterSubType === "ELDER_DRAGON" || this.blueTeam.drakes.length > 4 || this.redTeam.drakes.length > 4) ? 6 : 5) * 60000 < this.duration * 1000) {
				console.log('last drake not killed')
			}
		}

		this.objectiveEvent =  [...heralds, ...nashors, ...drakes].sort((a, b) => a.timestamp - b.timestamp);
		this.soulType = drakes.length > 2 ? drakes[2].monsterSubType.replace("_DRAGON", "") : "";
		this.mapSwitch = drakes.length > 2 ? drakes[2].timestamp : -1;

		console.log(game.gameMode);
	}

	getMap(soul?: boolean): string {
		return this.gameMode == "ARAM" ? "/assets/img/map/aram.png" :
			soul ? "/assets/img/map/map" + this.soulType.toLowerCase() + ".png" : "/assets/img/map/map.png";
	}

	getTeams(): Team[] {
		return [this.blueTeam, this.redTeam];
	}

	getPlayer(id: number) {
		if(id > 5) {
			return this.redTeam.getPlayerAt(id);
		}else{
			return this.blueTeam.getPlayerAt(id);
		}
	}

	getKills(): any[] {
		return this.killEvent;
	}
}
