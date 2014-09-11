(function(){
  'use strict';

  angular.module('quiktask')
  .factory('Task', ['$http', function($http){

    function create(task){
      return $http.post('/tasks', task);
    }

    function all(){
      return $http.get('/tasks');
    }

    function toggleCompleted(id){
      return $http.put('/tasks', {id:id});
    }


    return {toggleCompleted:toggleCompleted, create:create, all:all};
  }]);
})();

