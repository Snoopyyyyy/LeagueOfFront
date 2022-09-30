import {Component, Input, OnInit} from '@angular/core';
import {FixdataService} from "../services/fixdata.service";
import {Game} from "../models/Game";

@Component({
	selector: 'app-map-icon',
	templateUrl: './map-icon.component.html',
	styleUrls: ['./map-icon.component.css']
})
export class MapIconComponent implements OnInit {
	@Input() game!: Game;
	@Input() event!: any;
	@Input() range!: number;

	constructor(public Fixdata : FixdataService) {
	}

	ngOnInit(): void {

	}

}
