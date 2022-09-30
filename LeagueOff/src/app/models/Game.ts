import {Player} from "./Player";

export class Game {
	matchId!: number;
	surrender!: boolean;
	date!: Date;
	duration!: number;

	currentPlayer!: Player;
	soul?: string;


	players: Player[];
	events: any[];

	constructor() {
		this.players = [];
		this.events = [];
	}
}
