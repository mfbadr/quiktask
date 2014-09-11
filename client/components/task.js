(function(){
  'use strict';

  angular.module('quiktask')
  .factory('Task', ['$http', function($http){

    function create(priority){
      return $http.post('/tasks', priority);
    }

    function all(){
      return $http.get('/tasks');
    }

    return {create:create, all:all};
  }]);
})();

