import {Mongo} from 'meteor/mongo';

export var Properties = new Mongo.Collection<Property>('properties');

Properties.allow({
  insert: function() {
    var user = Meteor.user();
    return !!user;
  },
  update: function() {
    var user = Meteor.user();
    return !!user;
  },
  remove: function() {
    var user = Meteor.user();
    return !!user;
  }
});
