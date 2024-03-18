import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieCreationDTO, MovieDTO } from '../../../interfaces/movies/movie';
import { MultipleSelectorModel } from 'src/app/interfaces/selector-multiple/multipleSelectorModel';
import { actorMovieDTO } from '../../../interfaces/actors/actor';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  @Input()
  model!: MovieDTO;

  @Input()
  genresSelected: MultipleSelectorModel[] = [];

  @Input()
  genresNotSelected: MultipleSelectorModel[] = [];

  @Input()
  cinemasSelected: MultipleSelectorModel[] = [];

  @Input()
  cinemasNotSelected: MultipleSelectorModel[] = [];

  @Input()
  actorsSelected: actorMovieDTO[] = [];

  @Input()
  errors: string[] = [];

  @Output()
  onSubmit: EventEmitter<MovieCreationDTO> = new EventEmitter<MovieCreationDTO>();

  form!: FormGroup;

  imgChange = false;
  

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      summary: [''],
      onCinemas: new FormControl(false),
      releaseDate: [''],
      trailer: [''],
      poster: [''],
      genresIds: [[]],
      actors: [[]],
      cinemasIds: [[]]
    });
    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  saveChanges() {
    const genresIds = this.genresSelected.map(val => val.key);
    this.form.get('genresIds')?.setValue(genresIds);

    const cinemasIds = this.cinemasSelected.map(val => val.key);
    this.form.get('cinemasIds')?.setValue(cinemasIds);

    const actors = this.actorsSelected.map( val => {
      return {id: val.id, character: val.character}
    });
    this.form.get('actors')?.setValue(actors);

    if (!this.imgChange) {
      this.form.patchValue({ 'poster': null });
    }

    this.onSubmit.emit(this.form.value);
  }

  fileSelected(file: File) {
    this.form.get('poster')?.setValue(file);
    this.imgChange = true;
  }

  changeMarkdown(text: string) {
    this.form.get('summary')?.setValue(text);
  }

}
