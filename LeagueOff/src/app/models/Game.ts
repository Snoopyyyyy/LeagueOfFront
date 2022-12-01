import { Player } from "./Player";
import { Team } from "./Team";

export enum POST {
	'TOP' = 'TOP',
	'JUNGLE' = 'JUNGLE',
	'MIDDLE' = 'MIDDLE',
	'BOTTOM' = 'BOTTOM',
	'UTILITY' = 'UTILITY',
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
	gameType!: string;
  
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
	buildings: any[];

	constructor(game: Game) {
		// API
		this.currentPlayer = game.currentPlayer;
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
		this.buildings = [];
		let heralds: any[] = [];
		let nashors: any[] = [];
		let drakes: any[] = [];

		// set up team
		this.blueTeam = new Team(100, '#5281d7');
		this.redTeam = new Team(200, '#cf3a3e');

		for (let ply of game.players!) {
			if (ply.teamId == 100) {
				this.blueTeam.addPlayer(ply);
			} else {
				this.redTeam.addPlayer(ply);
			}
		}

		let cleanBuildings = [
			// Team 200
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 8955, y: 8510 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'OUTER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 4318, y: 13875 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'OUTER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 9767, y: 10113 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'INNER_TURRET',
				buildingType: 'TOWER_BUILDING',

				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 13866, y: 4505 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'OUTER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 7943, y: 13411 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'INNER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 10481, y: 13650 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'BASE_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 11134, y: 11207 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'BASE_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 11603, y: 11667 },
				timestamp: game.duration * 1000 + 10,
				buildingType: 'INHIBITOR_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 11261, y: 13659 },
				timestamp: game.duration * 1000 + 10,
				buildingType: 'INHIBITOR_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 13327, y: 8226 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'INNER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 13624, y: 10572 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'BASE_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 13598, y: 11316 },
				timestamp: game.duration * 1000 + 10,
				buildingType: 'INHIBITOR_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 13052, y: 12612 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'NEXUS_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 200,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 12611, y: 13084 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'NEXUS_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0,
			},
			// Team 100
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 981, y: 10441 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'OUTER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 5846, y: 6396 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'OUTER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 1512, y: 6699 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'INNER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 10504, y: 1029 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'OUTER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 1169, y: 4287 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'BASE_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 5048, y: 4812 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'INNER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 3651, y: 3696 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'BASE_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 3203, y: 3208 },
				timestamp: game.duration * 1000 + 10,
				buildingType: 'INHIBITOR_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'TOP_LANE',
				position: { x: 1169, y: 3573 },
				timestamp: game.duration * 1000 + 10,
				buildingType: 'INHIBITOR_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 6919, y: 1483 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'INNER_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 4281, y: 1253 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'BASE_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'BOT_LANE',
				position: { x: 3454, y: 1241 },
				timestamp: game.duration * 1000 + 10,
				buildingType: 'INHIBITOR_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 2177, y: 1807 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'NEXUS_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
			{
				type: 'BUILDING_KILL',
				bounty: 0,
				teamId: 100,
				killerId: 0,
				laneType: 'MID_LANE',
				position: { x: 1748, y: 2270 },
				timestamp: game.duration * 1000 + 10,
				towerType: 'NEXUS_TURRET',
				buildingType: 'TOWER_BUILDING',
				spawn: 0
			},
		];

		let buildings: any[] = [];
		for (const event of game.events ?? []) {
			switch (event.type) {
				case 'CHAMPION_KILL':
					event.killerTeamId = event.killerId > 5 ? 200 : 100;
					this.killEvent.push(event);
					break;
				case 'ELITE_MONSTER_KILL':
					if (event.monsterType === 'RIFTHERALD') heralds.push(event);
					if (event.monsterType === 'BARON_NASHOR') nashors.push(event);
					if (event.monsterType === 'DRAGON') drakes.push(event);
					break;
				case 'BUILDING_KILL':
					let spawn = 0;
					if (event.buildingType === 'INHIBITOR_BUILDING') {
						let last = buildings
							.filter(
								(b) =>
									b.buildingType === 'INHIBITOR_BUILDING' &&
									b.laneType === event.laneType
							)
							.pop();
						spawn = last ? 60000 * 5 + last.timestamp : 0;
					}

					buildings.push({
						...event,
						spawn,
					});
					break;
			}
		}

		let checkPosition = (a: {x: number, y: number}, b: {x: number, y: number}): boolean => {
			let marge = 50;

			let x = Math.abs(a.x - b.x);
			let y = Math.abs(a.y - b.y);
			return x <= marge && y <= marge;
		}

		this.buildings = cleanBuildings.map(b => {
			let oldB = buildings.find(bu => checkPosition(bu.position, b.position));
			return oldB ? { ...b, ...oldB } : b;
		});

	

		this.buildings.push(...buildings.filter(b => b.spawn !== 0).map(b => {
			console.log(b)
			let oldB = cleanBuildings.find(bu => checkPosition(bu.position, b.position));
			return oldB ? { ...b, position: oldB.position } : b;
		}));

		// heralds
		heralds = heralds.map((herald, id) => {
			let before = id != 0 ? heralds[id - 1] : null;
			return {
				...herald,
				spawn: id == 0 || !before ? 8 * 60000 : before.timestamp + 6 * 60000,
				position: { x: 5007, y: 10471 },
			};
		});
		if (heralds.length > 0) {
			let last = heralds[heralds.length - 1];
			if (last.timestamp + 6 * 60000 < 19 * 60000 + 50000) {
				heralds.push({
					type: 'ELITE_MONSTER_IGNORE',
					bounty: 0,
					killerId: 0,
					spawn: last.timestamp + 6 * 60000,
					position: { x: 5007, y: 10471 },
					timestamp: 19 * 60000 + 50000,
					monsterType: 'RIFTHERALD',
					killerTeamId: 0,
				});
			}
		} else if (this.duration > 8 * 60000) {
			let max = 19 * 60000 + 50000;
			heralds.push({
				type: 'ELITE_MONSTER_IGNORE',
				bounty: 0,
				killerId: 0,
				spawn: 8 * 60000,
				position: { x: 5007, y: 10471 },
				timestamp: this.duration > max ? max : this.duration,
				monsterType: 'RIFTHERALD',
				killerTeamId: 0,
			});
		}
    
		// nashors
		nashors = nashors.map((nashor, id) => {
			let before = id != 0 ? nashor[id - 1] : null;
			return {
				...nashor,
				spawn: id == 0 || !before ? 20 * 60000 : before.timestamp + 7 * 60000,
				position: { x: 5007, y: 10471 },
			};
		});
		if (nashors.length > 0) {
			let last = nashors[nashors.length - 1];
			if (last) {
				if (last.timestamp + 6 * 60000 < this.duration * 1000) {
					nashors.push({
						type: 'ELITE_MONSTER_KILL',
						bounty: 0,
						killerId: 0,
						position: {
							x: 5007,
							y: 10471,
						},
						timestamp: this.duration * 1001,
						monsterType: 'BARON_NASHOR',
						killerTeamId: 0,

						spawn: last.timestamp + 6 * 60000,
					});
				}
			}
		}

		// drakes
		drakes = drakes.map((drake, id) => {
			let before = id != 0 ? drakes[id - 1] : null;
			drake = {
				...drake,
				spawn:
					id == 0 || !before
						? 5 * 60000
						: before.timestamp +
						  (drake.monsterSubType === 'ELDER_DRAGON' ? 6 : 5) * 60000,
			};
			if (drake.killerTeamId == 100) {
				this.blueTeam.drakes.push(drake);
			} else if (drake.killerTeamId == 200) {
				this.redTeam.drakes.push(drake);
			}
			return drake;
		});
		if (drakes.length > 0) {
			let last = drakes[drakes.length - 1];
			if (
				last.timestamp +
					(last.monsterSubType === 'ELDER_DRAGON' ||
					this.blueTeam.drakes.length > 4 ||
					this.redTeam.drakes.length > 4
						? 6
						: 5) *
						60000 <
				this.duration * 1000
			) {
				console.log('last drake not killed');
			}
		}

		this.objectiveEvent = [...heralds, ...nashors, ...drakes].sort(
			(a, b) => a.timestamp - b.timestamp
		);
		this.soulType =
			drakes.length > 2 ? drakes[2].monsterSubType.replace('_DRAGON', '') : '';
		this.mapSwitch = drakes.length > 2 ? drakes[2].timestamp : -1;
	}

	getMap(soul?: boolean): string {
		return this.gameMode == 'ARAM'
			? '/assets/img/map/aram.png'
			: soul
			? '/assets/img/map/map' + this.soulType.toLowerCase() + '.png'
			: '/assets/img/map/map.png';
	}

	getTeams(): Team[] {
		return [this.blueTeam, this.redTeam];
	}

	getPlayer(id: number) {
		if (id > 5) {
			return this.redTeam.getPlayerAt(id);
		} else {
			return this.blueTeam.getPlayerAt(id);
		}
	}

	getKills(): any[] {
		return this.killEvent;
	}
}
