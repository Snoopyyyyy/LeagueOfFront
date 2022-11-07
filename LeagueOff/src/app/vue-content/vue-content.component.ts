import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vue-content',
  templateUrl: './vue-content.component.html',
  styleUrls: ['./vue-content.component.css']
})
export class VueContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	  console.log('call')
  }

}
