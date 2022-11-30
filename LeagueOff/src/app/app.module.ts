import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VueContentComponent} from './vue-content/vue-content.component';
import {HomePageComponent} from './home-page/home-page.component';
import {MatchsListeComponent} from './matchs-liste/matchs-liste.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SortByDatePipe } from './pipes/sort-by-date.pipe';
import { SortByMostPlayedPipe } from './pipes/sort-by-most-played.pipe';

@NgModule({
	declarations: [
		AppComponent,
		VueContentComponent,
		HomePageComponent,
		MatchsListeComponent,
  SortByDatePipe,
  SortByMostPlayedPipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
