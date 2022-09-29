import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VueContentComponent} from './vue-content/vue-content.component';
import {HomePageComponent} from "./home-page/home-page.component";
import {MatchsListeComponent} from './matchs-liste/matchs-liste.component';

const routes: Routes = [
	{path: '', component: HomePageComponent},
	{path: 'game/:name/:puuid', component: MatchsListeComponent},
	{path: 'vue-content', component: VueContentComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],

})
export class AppRoutingModule {
}
