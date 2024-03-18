import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MapComponent } from './map.component';
import { LeafletMouseEvent } from 'leaflet';
import { CoordinateWithMessage } from 'src/app/interfaces/map/coordinate';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should display initial markers', () => {
    const initialCoordinates: CoordinateWithMessage[] = [
      { latitude: 43.35986527932171, longitude: -5.845275907195174, message: 'Marker 1' },
      { latitude: 43.361, longitude: -5.853, message: 'Marker 2' }
    ];
    component.initialCoordinate = initialCoordinates;
    fixture.detectChanges();

    const markers = component.caps.getLayers();
    expect(markers.length).toBe(initialCoordinates.length);
  });
  
  it('should emit selected coordinates when map is clicked', () => {
    spyOn(component.selectedCoordinate, 'emit');
    const latLng = { lat: 43.36, lng: -5.85 };
    component.manageClick({ latlng: latLng } as LeafletMouseEvent);
    expect(component.selectedCoordinate.emit).toHaveBeenCalledWith({ latitude: latLng.lat, longitude: latLng.lng });
  });
  
  it('should clear existing markers when a new one is added', () => {
    // Arrange
    const initialCoordinates: CoordinateWithMessage[] = [
      { latitude: 43.35986527932171, longitude: -5.845275907195174, message: 'Marker 1' }
    ];
    component.initialCoordinate = initialCoordinates;
    fixture.detectChanges();

    // Act
    const latLng = { lat: 43.36, lng: -5.85 };
    component.manageClick({ latlng: latLng } as LeafletMouseEvent);
    fixture.detectChanges();

    // Assert
    expect(component.caps.getLayers().length).toBe(1);
  });
});
