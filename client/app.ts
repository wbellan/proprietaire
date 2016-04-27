import 'reflect-metadata';
import 'zone.js/dist/zone';
import {Component, provide} from 'angular2/core';
import {MeteorComponent} from 'angular2-meteor';
// import {bootstrap} from 'angular2/platform/browser';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {APP_BASE_HREF} from 'angular2/platform/common';
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

class Proprietaire extends MeteorComponent {
  constructor() { super(); }
}

bootstrap(Proprietaire, [ROUTER_PROVIDERS, provide (APP_BASE_HREF, { useValue: '/' })]);
