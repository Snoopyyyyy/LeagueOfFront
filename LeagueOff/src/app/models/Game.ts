import {EventBase} from "./Event/EventBase";
import {Player} from "./Player";

export class Game {
	matchId!: number;
	surrender!: boolean;
	date!: Date;
	duration!: number;
	currentPlayer!: Player;


	players: Player[];
	events: EventBase[];

	constructor() {
		this.players = [];
		this.events = [];
	}
}
