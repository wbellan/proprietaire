import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {RouterLink} from 'angular2/router';
import {Properties} from '../../../collections/properties';
import {MeteorComponent} from 'angular2-meteor';

@Component({
  selector: 'property-details',
  templateUrl: '/client/components/property/property-details.html',
  directives: [RouterLink]
})
export class PropertyDetails extends MeteorComponent {
  property: Property;

  constructor(params: RouteParams) {
    super();
    var propertyId = params.get('propertyId');

    this.subscribe('property', propertyId, () => {
      this.property = Properties.findOne(propertyId);
    }, true);
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
