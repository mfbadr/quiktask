(function(){
  'use strict';

  angular.module('quiktask')
  .controller('PrioritiesCtrl', ['$scope','Priority', function($scope, Priority){
    $scope.title = 'Priorities';
    $scope.priority = {color:'#cccccc'};
    $scope.sort = 'name';

    Priority.all().then(function(response){
      $scope.priorities = response.data.priorities;
    });

    $scope.add = function(){
      Priority.create($scope.priority).then(function(response){
        //expect back a priority
        $scope.priorities.push(response.data.priority);
        $scope.priority = {};
      });
    };
  }]);
})();

