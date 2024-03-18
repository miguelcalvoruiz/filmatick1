import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexActorComponent } from './index-actor.component';
import { ActorsService } from '../../../services/actors/actors.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { actorDTO } from 'src/app/interfaces/actors/actor';

describe('IndexActorComponent', () => {
  let component: IndexActorComponent;
  let fixture: ComponentFixture<IndexActorComponent>;
  let actorsService: ActorsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexActorComponent],
      imports: [HttpClientTestingModule],
      providers: [ActorsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexActorComponent);
    component = fixture.componentInstance;
    actorsService = TestBed.inject(ActorsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load actors on initialization', () => {
    const actors = [{ id: 1, name: 'Actor 1', birthdate: new Date(), photo: '', biography: '' }, { id: 2, name: 'Actor 2', birthdate: new Date(), photo: '', biography: '' }];
    spyOn(actorsService, 'getAll').and.returnValue(of({ body: actors, headers: { get: () => '2' } }));
    component.ngOnInit();
    expect(component.actors).toEqual(actors);
    expect(component.quantityTotalRecords).toEqual(2);
  });
  

  it('should delete actor', () => {
    const actors: actorDTO[] = [{ id: 1, name: 'Actor 1', birthdate: new Date(), photo: '', biography: '' }, { id: 2, name: 'Actor 2', birthdate: new Date(), photo: '', biography: '' }];
    spyOn(actorsService, 'deleteActor').and.returnValue(of(null as any));
    spyOn(component, 'loadRecords');
    component.actors = actors;
    component.deleteActor(1);
    expect(component.loadRecords).toHaveBeenCalled();
});


  it('should update pagination', () => {
    const event = { pageIndex: 1, pageSize: 10 } as any;
    spyOn(component, 'loadRecords');
    component.updatePagination(event);
    expect(component.actualPage).toEqual(2);
    expect(component.quantityRecordsToShow).toEqual(10);
    expect(component.loadRecords).toHaveBeenCalled();
  });
});
