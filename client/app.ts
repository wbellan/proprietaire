import 'reflect-metadata';
import 'zone.js/dist/zone';
import {NgZone, Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Properties} from '../collections/properties';
import {Tracker} from 'meteor/tracker';

@Component({
  selector: 'app',
  templateUrl: 'client/app.html'
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
}

bootstrap(Proprietaire);
