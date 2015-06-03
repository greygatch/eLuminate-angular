'use strict';

angular.module('poseidon')
.controller('LeaderboardCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  User.findAll()
  .then(function(response){
    console.log(response);
  });
});
