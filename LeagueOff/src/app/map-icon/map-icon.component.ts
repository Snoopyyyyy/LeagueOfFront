import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-map-icon',
	templateUrl: './map-icon.component.html',
	styleUrls: ['./map-icon.component.css']
})
export class MapIconComponent implements OnInit {
	@Input() event!: any;
	@Input() range!: number;

	constructor() {
	}

	ngOnInit(): void {

	}

}
