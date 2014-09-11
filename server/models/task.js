'use strict';

//var Mongo = require('mongodb');
var async  = require('async');

function Task(o){
  this.name  = o.name;
  this.priority = o.priority;
  this.due = o.due;
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

module.exports = Task;

function iterator(task, cb){
  require('./priority').findById(task.priority, function(err, priority){
    task.priority = priority;
    cb(null, task);
  });
}

