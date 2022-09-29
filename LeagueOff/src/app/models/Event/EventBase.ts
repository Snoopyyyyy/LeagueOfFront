export abstract class EventBase {
	timestamp: number;
	type: string;

	protected constructor(timestamp: number, type: string) {
		this.timestamp = timestamp;
		this.type = type;
	}

}
