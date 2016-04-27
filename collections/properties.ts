import {Mongo} from 'meteor/mongo';

export var Properties = new Mongo.Collection<Property>('properties');

Properties.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});
