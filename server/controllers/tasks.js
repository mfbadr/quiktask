'use strict';

var Task = require('../models/task');

exports.create = function(req, res){
  Task.create(req.body, function(err, task){
    res.send({task:task});
  });
};

exports.index = function(req, res){
  Task.all(function(err, tasks){
    res.send({tasks:tasks});
  });
};

exports.toggleCompleted = function(req, res){
  Task.toggleCompleted(req.body, function(err, task){
    res.send({task:task});
  });
};
