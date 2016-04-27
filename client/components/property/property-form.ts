import 'reflect-metadata';
import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {Properties} from '../../../collections/properties';
import {InjectUser} from 'angular2-meteor-accounts-ui';
import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'property-form',
  templateUrl: '/client/components/property/property-form.html'
})
@InjectUser()
export class PropertyForm extends MeteorComponent {
  propertiesForm: ControlGroup;
  user: Meteor.User;

  constructor() {
    super();
    let fb = new FormBuilder();

    this.propertiesForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required]
    });
  }

  addProperty(property) {
    if (this.propertiesForm.valid) {
      if (Meteor.userId()) {
        Properties.insert({
          name: property.name,
          description: property.description,
          location: property.location
        });

        (<Control>this.propertiesForm.controls['name']).updateValue('');
        (<Control>this.propertiesForm.controls['description']).updateValue('');
        (<Control>this.propertiesForm.controls['location']).updateValue('');
      } else {
        alert ('Please log in to add a property.');
      }
    } else {
      alert ('Form is invalid. Please enter in the data and try again.');
    }
  }
}
