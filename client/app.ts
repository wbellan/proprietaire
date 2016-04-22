import 'reflect-metadata';
import 'zone.js/dist/zone';
import {NgZone, Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Properties} from '../collections/properties';
import {Tracker} from 'meteor/tracker';
import {PropertiesForm} from './components/properties/properties-form';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html',
  directives: [PropertiesForm]
})

class Proprietaire {

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

bootstrap(Proprietaire);
