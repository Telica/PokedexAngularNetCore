import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { HttpErrorInterceptor } from './http-error.interceptor';

import { MatSnackBarModule} from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule} from '@angular/material/table'
import { MatPaginatorModule} from '@angular/material/paginator'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonCatalogComponent } from './pokemon-catalog/pokemon-catalog.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PokemonCatalogComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      { path: '', component: PokemonCatalogComponent, pathMatch: 'full' },
      { path: 'pokemon-catalog', component: PokemonCatalogComponent},
      { path: 'pokemon-details', component: PokemonDetailsComponent}
    ]),
    BrowserAnimationsModule
  ],
  exports: [MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
