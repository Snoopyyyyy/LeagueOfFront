export class GameItem {
	id!: number;
	name!: string;
	create!: number;
	destroy!: number;
	stack?: boolean;
	items?: number[][];

	constructor(id: number, stackable?: boolean) {
		this.id = id;
		this.stack = stackable;
		if(this.isStackable()) {
			this.items = [];
		}
	}

	isStackable(): boolean {
		return this.stack != undefined && this.stack;
	}

	getQuantity(timestamp: number): number {
		if(this.isStackable()) {
			return this.items!.filter(it => it[0] <= timestamp && timestamp < it[1]).length;
		}else {
			return this.create <= timestamp && timestamp < this.destroy ? 1 : 0;
		}
	}

	addItem(item: GameItem) {
		if(this.isStackable()) {
			this.items!.push([item.create, item.destroy])
		}
	}
}


export class GameInventory {
	inventory!: GameItem[];
	gameItemEvent!: GameItem[];


}
