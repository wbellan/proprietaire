import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {RouterLink} from 'angular2/router';
import {Properties} from '../../../collections/properties';

@Component({
  selector: 'property-details',
  templateUrl: '/client/components/property/property-details.html',
  directives: [RouterLink]
})
export class PropertyDetails {
  property: Object;

  constructor(params: RouteParams) {
    var propertyId = params.get('propertyId');
    this.property = Properties.findOne(propertyId);
  }

  saveProperty(property) {
    Properties.update(property._id, {
      $set: {
        name: property.name,
        description: property.description,
        location: property.location
      }
    });
  }
}
