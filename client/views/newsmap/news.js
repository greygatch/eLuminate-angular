'use strict';

angular.module('poseidon')
.controller('NewsCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, Map, User){
  Map.geocode('london', function(result){
    console.log('map', result[0]);
    var lat = result[0].geometry.location.A;
    var lng = result[0].geometry.location.F;
    // location = result[0].formatted_address;
    // $scope.location = result[0].formatted_address;
    Map.create('#mapDiv', 25, 0, 2);
    console.log($('#mapDiv'));
  });
});
