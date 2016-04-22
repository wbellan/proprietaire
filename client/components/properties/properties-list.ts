import 'reflect-metadata';
import 'zone.js/dist/zone';
import {NgZone, Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Properties} from '../../../collections/properties';
import {PropertiesForm} from './properties-form';

@Component({
  selector: 'properties-list',
  templateUrl: '/client/components/properties/properties-list.html',
  directives: [PropertiesForm, RouterLink]
})

export class PropertiesList {
  title: string;
  properties: Array<Object>;

  constructor(zone: NgZone) {
    this.title = 'Properties';
    Tracker.autorun(() => zone.run(() => {
      this.properties = Properties.find().fetch();
    }));
  }

  removeProperty(property) {
    Properties.remove(property._id);
 }
}
