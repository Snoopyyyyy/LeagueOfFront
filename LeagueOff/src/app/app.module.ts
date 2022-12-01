import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {MatchsListeComponent} from './matchs-liste/matchs-liste.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MatchDetailsComponent } from './match-details/match-details.component';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';
import { SortByMostPlayedPipe } from './pipes/sort-by-most-played.pipe';
import { MatchLogsComponent } from './match-logs/match-logs.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		MatchsListeComponent,
  	MatchDetailsComponent,
    SortByDatePipe,
    SortByMostPlayedPipe,
    MatchLogsComponent,
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
