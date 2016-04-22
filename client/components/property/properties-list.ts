import 'reflect-metadata';
import 'zone.js/dist/zone';
import {NgZone, Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Properties} from '../../../collections/properties';
import {PropertyForm} from './property-form';

@Component({
  selector: 'property-list',
  templateUrl: '/client/components/property/properties-list.html',
  directives: [PropertyForm, RouterLink]
})

export class PropertyList {
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
