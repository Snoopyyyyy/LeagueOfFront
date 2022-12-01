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
		if (typeof (post) == "string") {
			return this.players[post]!;
		} else {
			console.log(post);
			console.log(this.players)
			return Object.values<Player>(this.players).find(p => p.participantId === post)!
		}
	}

	getGold(): number {
		return 0;
	}
}
