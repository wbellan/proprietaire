import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';
import {PropertiesList} from './components/properties/properties-list';
import {PropertyDetails} from './components/properties/property-details';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path: '/', as: 'PropertiesList', component: PropertiesList },
  { path: '/property/:propertyId', as: 'PropertyDetails', component: PropertyDetails }
])

class Proprietaire {}

bootstrap(Proprietaire, [ROUTER_PROVIDERS, provide (APP_BASE_HREF, { useValue: '/' })]);
