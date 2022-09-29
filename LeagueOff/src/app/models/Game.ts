import {EventBase} from "./Event/EventBase";
import {Player} from "./Player";
import {Summoner} from "./Summoner";

export class Game {
	game_id!: string;
	date!: Date;
	duration!: number;
	win!: boolean;

	summoner!: Summoner;
	players: Player[];
	events: EventBase[];

	constructor() {
		this.players = [];
		this.events = [];
	}
}
