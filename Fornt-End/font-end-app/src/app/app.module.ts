import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';
import { GenericListComponent } from './shared/generic-list/generic-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MaterialModule } from './modules/material/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { RatingComponent } from './shared/rating/rating.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { IndexGenresComponent } from './components/genres/index-genres/index-genres.component';
import { AddGenresComponent } from './components/genres/add-genres/add-genres.component';
import { AddActorComponent } from './components/actors/add-actor/add-actor.component';
import { IndexActorComponent } from './components/actors/index-actor/index-actor.component';
import { AddMovieComponent } from './components/movies/add-movie/add-movie.component';
import { AddCinemaComponent } from './components/cinema/add-cinema/add-cinema.component';
import { IndexCinemaComponent } from './components/cinema/index-cinema/index-cinema.component';
import { EditActorComponent } from './components/actors/edit-actor/edit-actor.component';
import { EditCinemaComponent } from './components/cinema/edit-cinema/edit-cinema.component';
import { EditMovieComponent } from './components/movies/edit-movie/edit-movie.component';
import { EditGenreComponent } from './components/genres/edit-genre/edit-genre.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGenreComponent } from './components/genres/form-genre/form-genre.component';
import { MoviesFilterComponent } from './components/movies/movies-filter/movies-filter.component';
import { FormActorComponent } from './components/actors/form-actor/form-actor.component';
import { InputImgComponent } from './shared/input-img/input-img.component';
import { InputMarkdownComponent } from './shared/input-markdown/input-markdown.component';
import { FormCinemaComponent } from './components/cinema/form-cinema/form-cinema.component';
import { MapComponent } from './shared/map/map.component';
import { FormMovieComponent } from './components/movies/form-movie/form-movie.component';
import { SelectorMultipleComponent } from './shared/selector-multiple/selector-multiple.component';
import { AutocompleteActorsComponent } from './components/actors/autocomplete-actors/autocomplete-actors.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ShowErrorsComponent } from './shared/show-errors/show-errors.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MoviesDetailComponent } from './components/movies/movies-detail/movies-detail.component';
import { AuthorizedComponent } from './components/security/authorized/authorized.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { AuthenticationFormComponent } from './components/security/authentication-form/authentication-form.component';
import { SecurityInterceptorService } from './services/security/security-interceptor.service';
import { UsersIndexComponent } from './components/security/users-index/users-index.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    GenericListComponent,
    MenuComponent,
    RatingComponent,
    LandingPageComponent,
    IndexGenresComponent,
    AddGenresComponent,
    AddActorComponent,
    IndexActorComponent,
    AddMovieComponent,
    AddCinemaComponent,
    IndexCinemaComponent,
    EditActorComponent,
    EditCinemaComponent,
    EditMovieComponent,
    EditGenreComponent,
    FormGenreComponent,
    MoviesFilterComponent,
    FormActorComponent,
    InputImgComponent,
    InputMarkdownComponent,
    FormCinemaComponent,
    MapComponent,
    FormMovieComponent,
    SelectorMultipleComponent,
    AutocompleteActorsComponent,
    ShowErrorsComponent,
    MoviesDetailComponent,
    AuthorizedComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationFormComponent,
    UsersIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    SweetAlert2Module.forRoot(),
    LeafletModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
