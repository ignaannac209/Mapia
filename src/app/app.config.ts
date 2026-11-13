import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import mapboxgl from 'mapbox-gl';

mapboxgl.workerUrl = new URL('mapbox-gl-csp-worker.js', document.baseURI).href;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

     // HashStrategy
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
};
