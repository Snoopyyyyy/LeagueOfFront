import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { DropDownServerComponent } from './drop-down-server/drop-down-server.component';
import { VueContentComponent } from './vue-content/vue-content.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    DropDownServerComponent,
    VueContentComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
