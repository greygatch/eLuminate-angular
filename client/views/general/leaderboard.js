'use strict';

angular.module('poseidon')
.controller('LeaderboardCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  User.findAll()
  .then(function(response){
    $scope.users = response.data.filter(function(e){
      return e.username ? true : false;
    });
  });
});
