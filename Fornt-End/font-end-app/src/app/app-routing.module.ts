import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { IndexGenresComponent } from './components/genres/index-genres/index-genres.component';
import { AddGenresComponent } from './components/genres/add-genres/add-genres.component';
import { IndexActorComponent } from './components/actors/index-actor/index-actor.component';
import { AddActorComponent } from './components/actors/add-actor/add-actor.component';
import { IndexCinemaComponent } from './components/cinema/index-cinema/index-cinema.component';
import { AddCinemaComponent } from './components/cinema/add-cinema/add-cinema.component';
import { AddMovieComponent } from './components/movies/add-movie/add-movie.component';
import { EditActorComponent } from './components/actors/edit-actor/edit-actor.component';
import { EditGenreComponent } from './components/genres/edit-genre/edit-genre.component';
import { EditCinemaComponent } from './components/cinema/edit-cinema/edit-cinema.component';
import { EditMovieComponent } from './components/movies/edit-movie/edit-movie.component';
import { MoviesFilterComponent } from './components/movies/movies-filter/movies-filter.component';
import { MoviesDetailComponent } from './components/movies/movies-detail/movies-detail.component';
import { IsAdminGuard } from './is-admin.guard';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { UsersIndexComponent } from './components/security/users-index/users-index.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'genres', component: IndexGenresComponent, canActivate: [IsAdminGuard] },
  { path: 'genres/add', component: AddGenresComponent, canActivate: [IsAdminGuard] },
  { path: 'genres/edit/:id', component: EditGenreComponent, canActivate: [IsAdminGuard] },

  { path: 'actors', component: IndexActorComponent, canActivate: [IsAdminGuard] },
  { path: 'actors/add', component: AddActorComponent, canActivate: [IsAdminGuard] },
  { path: 'actors/edit/:id', component: EditActorComponent, canActivate: [IsAdminGuard] },

  { path: 'cinemas', component: IndexCinemaComponent, canActivate: [IsAdminGuard] },
  { path: 'cinemas/add', component: AddCinemaComponent, canActivate: [IsAdminGuard] },
  { path: 'cinemas/edit/:id', component: EditCinemaComponent, canActivate: [IsAdminGuard] },

  { path: 'movies/add', component: AddMovieComponent, canActivate: [IsAdminGuard] },
  { path: 'movies/edit/:id', component: EditMovieComponent, canActivate: [IsAdminGuard] },
  { path: 'movies/search', component: MoviesFilterComponent },
  { path: 'movie/:id', component: MoviesDetailComponent },

  { path: 'users', component: UsersIndexComponent, canActivate: [IsAdminGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
