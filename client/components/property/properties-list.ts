import 'reflect-metadata';
import 'zone.js/dist/zone';
import {MeteorComponent} from 'angular2-meteor';
import {NgZone, Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Properties} from '../../../collections/properties';
import {PropertyForm} from './property-form';
import {LoginButtons} from 'angular2-meteor-accounts-ui/login-buttons';

@Component({
  selector: 'property-list',
  templateUrl: '/client/components/property/properties-list.html',
  directives: [PropertyForm, RouterLink, LoginButtons]
})

export class PropertyList extends MeteorComponent {
  title: string;
  properties: Mongo.Cursor<Property>;

  constructor() {
    super();
    this.title = 'Properties';
    this.subscribe('properties', () => {
      this.properties = Properties.find();
    }, true);
  }

  removeProperty(property) {
    Properties.remove(property._id);
  }
}
