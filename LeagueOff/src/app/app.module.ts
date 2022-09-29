import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

<<<<<<< HEAD
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { DropDownServerComponent } from './drop-down-server/drop-down-server.component';
import { VueContentComponent } from './vue-content/vue-content.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatchsListeComponent } from './matchs-liste/matchs-liste.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    DropDownServerComponent,
    VueContentComponent,
    HomePageComponent,
    MatchsListeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
=======
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VueContentComponent} from './vue-content/vue-content.component';
import {HomePageComponent} from './home-page/home-page.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent,
		VueContentComponent,
		HomePageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
>>>>>>> Dev
})
export class AppModule {
}
