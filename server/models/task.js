'use strict';

var Mongo = require('mongodb'),
    async = require('async');

function Task(o){
  this.name  = o.name;
  this.priority = Mongo.ObjectID(o.priority);
  this.due = new Date(o.due);
  this.isComplete = false;
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

Task.create = function(obj, cb){
  obj = new Task(obj);
  Task.collection.save(obj, function(err, task){
    iterator(task, cb);
  });
};

Task.all = function(cb){
  //async.map to attach priority
  Task.collection.find().toArray(function(err, tasks){
    async.map(tasks, iterator, cb);
  });
};

Task.toggleCompleted = function(obj, cb){
  var id = Mongo.ObjectID(obj.id);
  Task.collection.findOne({_id:id}, function(err, task){
    task.isComplete = !task.isComplete;
    Task.collection.save(task, cb);
  });
};

module.exports = Task;

function iterator(task, cb){
  require('./priority').findById(task.priority, function(err, priority){
    task.priority = priority;
    cb(null, task);
  });
}


