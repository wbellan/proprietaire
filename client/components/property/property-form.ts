import 'reflect-metadata';
import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators, Control} from 'angular2/common';
import {Properties} from '../../../collections/properties';

@Component({
  selector: 'property-form',
  templateUrl: '/client/components/property/property-form.html'
})
export class PropertyForm {
  propertiesForm: ControlGroup;

  constructor() {
    let fb = new FormBuilder();

    this.propertiesForm = fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required]
    });
  }

  addProperty(property) {
    if (this.propertiesForm.valid) {
      Properties.insert({
        name: property.name,
        description: property.description,
        location: property.location
      });

      (<Control>this.propertiesForm.controls['name']).updateValue('');
      (<Control>this.propertiesForm.controls['description']).updateValue('');
      (<Control>this.propertiesForm.controls['location']).updateValue('');
    } else {
      alert ('Something went wrong!');
    }
  }
}
