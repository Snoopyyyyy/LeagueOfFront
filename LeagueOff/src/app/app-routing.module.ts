import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VueContentComponent } from './vue-content/vue-content.component';



const routes: Routes = [
  // Route de base (arrivée sur le site)
  { path: '', component: AppComponent},
  // Route vers un component particulier
  { path: 'vue-content', component: VueContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
