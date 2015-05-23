'use strict';

angular.module('poseidon')
.controller('NewsCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  Map.geocode('london', function(result){
    // location = result[0].formatted_address;
    // $scope.location = result[0].formatted_address;
    Map.create('#mapDiv', 25, 0, 2);
    $window.jQuery.getJSON('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=d9aaa709a92d3d4ad4efbd1902a469ac:19:72139126', function(response){
      console.log('NYT', response.results);
      var articles = response.results.filter(function(e){
        return e.geo_facet ? e : null;
      });
      var locations = [];
      articles.forEach(function(e){
        locations.push(e.geo_facet[0]);
      });
      console.log('locations', locations)
      $scope.$apply(function(){
        $scope.articles = articles;
      });
    })
  });
});
