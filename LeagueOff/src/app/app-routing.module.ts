import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VueContentComponent } from './vue-content/vue-content.component';
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'vue-content', component: VueContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
