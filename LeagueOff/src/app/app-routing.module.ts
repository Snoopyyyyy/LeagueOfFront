import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {MatchsListeComponent} from './matchs-liste/matchs-liste.component';
import {MatchDetailsComponent} from "./match-details/match-details.component";

const routes: Routes = [
	{path: '', component: HomePageComponent},
  {path: 'game/:name/history', component: MatchsListeComponent},
	{path: 'game/:game_id', component: MatchDetailsComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],

})
export class AppRoutingModule {
}
