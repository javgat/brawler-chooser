import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ApiModule, Configuration, ConfigurationParameters } from '@javgat/brawlify-api-client-angular';
import { HttpClientModule } from '@angular/common/http';
import { InputPlayerWrapperComponent } from './landing-page/input-player-wrapper/input-player-wrapper.component';
import { InputPlayerComponent } from './landing-page/input-player-wrapper/input-player/input-player.component';
import { InputMapComponent } from './landing-page/input-map/input-map.component';
import { OutputTeamWrapperComponent } from './landing-page/output-team-wrapper/output-team-wrapper.component';
import { OutputIndivWrapperComponent } from './landing-page/output-indiv-wrapper/output-indiv-wrapper.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';

export function apiConfigFactory (): Configuration {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  }
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    InputPlayerWrapperComponent,
    InputPlayerComponent,
    InputMapComponent,
    OutputTeamWrapperComponent,
    OutputIndivWrapperComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTableModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
