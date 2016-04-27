import {Properties} from '../collections/properties.ts';

Meteor.publish('properties', function() {
  return Properties.find({});
});

Meteor.publish('property', function(propertyId: string) {
  return Properties.find({_id: propertyId});
});
