import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environments';


mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: `
  div {
    width: 100%;
    height: 260px;
}
`,
})
export class MiniMap implements AfterViewInit {
    divElement = viewChild<ElementRef>('map');
    lngLat = input.required<{lng: number, lat: number}> ();
    zoom = input<number>(14);

  async ngAfterViewInit() {
    if ( !this.divElement()?.nativeElement ) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

      const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', //style URL
      center: this.lngLat(), // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoom(), // starting zoom
      interactive: false, //para que no se pueda mover el mapa
      pitch: 30, // estiulo tipo o algo 3D
  });
   new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
