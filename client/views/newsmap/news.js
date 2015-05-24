'use strict';

angular.module('poseidon')
.controller('NewsCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){

  $scope.i = 0;
  $scope.isRead = true;

  Map.geocode('london', function(result){
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
      $scope.$apply(function(){
        $scope.articles = articles;
        $scope.article = $scope.articles[0];
      });
    })
  });

  $scope.isRead = function(){
    var readingPoints = Math.floor(Math.random() * 25) + 75;
    console.log(readingPoints);
  }

  $scope.move = function(direction){
    if(direction === 'next' && $scope.i < $scope.articles.length - 1){
     $scope.i += 1;
    }else if(direction === 'prev' && $scope.i > 0){
     $scope.i -= 1;
    }
    $scope.article = $scope.articles[$scope.i];
  }

});
