import {Player} from "./Player";
import {POST} from "./Game";

export class Team {
	id: number;
	players: any;
	drakes: any[];
	color: string;
	win: boolean;


	constructor(id: number, color: string) {
		this.id = id;
		this.color = color;
		this.players = {};
		this.drakes = [];
		this.win = false;
	}

	addPlayer(ply: Player) {
		this.players[ply.post! != "Invalid" ? ply.post! : ply.participantId!] = ply;
		this.win = ply.win ?? this.win;
	}

	getPlayerAt(post: string | number): Player {
		return this.players[post]!;
	}

	getGold(): number {
		return 0;
	}
}
