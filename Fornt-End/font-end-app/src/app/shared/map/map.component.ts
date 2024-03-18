import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, LayerGroup, icon, marker } from 'leaflet';
import { Coordinate, CoordinateWithMessage } from '../../interfaces/map/coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  @Input()
  initialCoordinate: CoordinateWithMessage[] = [];

  @Input()
  isEditing = false;

  @Input()
  onlyReading: boolean = false;

  @Output()
  selectedCoordinate = new EventEmitter<Coordinate>();

  customIcon = icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    popupAnchor: [0, -30],
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    shadowSize: [41, 41],
  });

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(43.35986527932171, -5.845275907195174)
  };

  caps: LayerGroup = new LayerGroup();
  coordinatesAvailable = false;

  constructor() { }

  ngOnInit(): void {
    this.initializeMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialCoordinate'] && this.coordinatesAvailable) {
      this.initializeMarkers();
    }
  }
  
  private initializeMarkers(): void {
    // Limpiamos los marcadores existentes antes de agregar nuevos
    this.caps.clearLayers();
  
    this.initialCoordinate.forEach(value => {
      if (value.latitude !== undefined && value.longitude !== undefined) {
        const newMarker = marker([value.latitude, value.longitude], { icon: this.customIcon });
        if (value.message) {
          newMarker.bindPopup(value.message, { autoClose: true, autoPan: true })
        }
        this.caps.addLayer(newMarker);
      }
    });
  }
  
  manageClick(event: LeafletMouseEvent) {
    if (!this.onlyReading) {
      // Limpiamos todos los marcadores existentes antes de agregar uno nuevo
      this.caps.clearLayers();
  
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      const newMarker = new Marker([latitude, longitude], { icon: this.customIcon });
      this.caps.addLayer(newMarker);
      this.selectedCoordinate.emit({ latitude: latitude, longitude: longitude });
    }
  }
}
