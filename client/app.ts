import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';
import {PropertyList} from './components/property/properties-list';
import {PropertyDetails} from './components/property/property-details';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', as: 'PropertyList', component: PropertyList },
  { path: '/property/:propertyId', as: 'PropertyDetails', component: PropertyDetails }
])

class Proprietaire {}

bootstrap(Proprietaire, [ROUTER_PROVIDERS, provide (APP_BASE_HREF, { useValue: '/' })]);
