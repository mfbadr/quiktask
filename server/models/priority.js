'use strict';

var Mongo = require('mongodb');

function Priority(o){
  this.name  = o.name;
  this.color = o.color;
}

Object.defineProperty(Priority, 'collection', {
  get: function(){return global.mongodb.collection('priorities');}
});

Priority.create = function(obj, cb){
  obj = new Priority(obj);
  Priority.collection.save(obj, cb);
};

Priority.all = function(cb){
  Priority.collection.find().toArray(cb);
};

Priority.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Priority.collection.findOne({_id:id}, cb);
};

module.exports = Priority;
