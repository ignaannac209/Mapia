import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environments';
import { v4 as UUIDv4 } from 'uuid'
import { DecimalPipe } from '@angular/common';
import { map } from 'rxjs';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  color: string;
  longitude: number;
  latitude: number;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [DecimalPipe],
  templateUrl: './markers-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class MarkersPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if ( !this.divElement()?.nativeElement ) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

      const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', //style URL
      center: [-90.48623, 14.6099], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 14, // starting zoom
  });

    // const marker = new mapboxgl.Marker({
    //   draggable: false,
    // })
    // .setLngLat([-90.48623, 14.6099])
    // .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event);
    // })

    this.mapListeners(map);
}
    mapListeners(map: mapboxgl.Map){

      map.on('click', (event) => this.mapClick(event));

      this.map.set(map);
    }
      mapClick(event: mapboxgl.MapMouseEvent){

        if ( !this.map() )return;

        const map = this.map()!;
        const coords = event.lngLat;
        const color = '#xxxxxx'.replace(/x/g, (y) =>
          ((Math.random() * 16) | 0).toString(16)
        );

        const mapBoxMarker = new mapboxgl.Marker({
          color: color,
        }).setLngLat(coords)
        .addTo(map);

        const newMarker: Marker ={
          id: UUIDv4(),
          color,
          longitude: coords.lng,
          latitude: coords.lat,
          mapboxMarker: mapBoxMarker
        }

        //this.markers.set([newMarker, ...this.markers()])
        this.markers.update(markers => [newMarker, ...markers]);
      }

      flyToMarker( lngLat: LngLatLike){
        if ( !this.map() ) return;

        this.map()?.flyTo({
          center: lngLat
        })
      }
      deleteMarker(marker: Marker){
        if ( !this.map()) return;
        const map = this. map()!;

        marker.mapboxMarker.remove();

        this.markers.set(this.markers().filter((m) => m.id != marker.id));
      }
  }

