(function(){
  'use strict';

  angular.module('quiktask')
  .controller('TasksCtrl', ['$scope','Priority', 'Task', function($scope, Priority, Task){
    $scope.title = 'Tasks';
    $scope.priorities = [];
    $scope.tasks = [];
    $scope.sort = 'name';

    Priority.all().then(function(response){
      $scope.priorities = response.data.priorities;
    });
    Task.all().then(function(response){
      $scope.tasks = response.data.tasks;
    });

    $scope.add = function(){
      Task.create($scope.task).then(function(response){
        debugger;
        $scope.tasks.push(response.data.task);
        $scope.task = {};
      });
    };

    $scope.toggleCompleted = function(id){
      Task.toggleCompleted(id).then(function(response){
        //debugger;
      });
    };

  }]);
})();

