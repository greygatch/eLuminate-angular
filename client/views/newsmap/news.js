'use strict';

angular.module('poseidon')
.controller('NewsCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  var markers = [];
  clearMarkers();
  $scope.i = 0;
  $rootScope.points = 0;
  $scope.isRead = true;
  $scope.isImage = true;

  Map.geocode('london', function(result){
    var map = Map.create('#mapDiv', 25, 0, 2);
    $window.jQuery.getJSON('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=d9aaa709a92d3d4ad4efbd1902a469ac:19:72139126', function(response){
      console.log('NYT', response.results);
      var articles = response.results.filter(function(e){
        return e.geo_facet  || e.subsection ? e : null;
      });
      console.log(articles);
      var locations = [];
      var coordinates = {};
      articles.forEach(function(e){
        locations.push(e.geo_facet[0] ? e.geo_facet[0] : e.subsection);
      });
      locations.forEach(function(l){
        var lat;
        var lng;
        Map.geocode(l, function(result){
          lat = result[0].geometry.location.A;
          lng = result[0].geometry.location.F;
          Map.addMarker(map, lat, lng, '!', '/assets/marker.png');
        })
      });

      $scope.$apply(function(){
        $scope.articles = articles;
        $scope.article = $scope.articles[0];
      });
    })
  });

  $scope.isRead = function(){
    $rootScope.points += Math.floor(Math.random() * 25) + 75;
  }

  $scope.move = function(direction){
    if(direction === 'next' && $scope.i < $scope.articles.length - 1){
     $scope.i += 1;
    }else if(direction === 'prev' && $scope.i > 0){
     $scope.i -= 1;
    }
    $scope.article = $scope.articles[$scope.i]
    if(!($scope.article.multimedia[0])){
      $scope.isImage = false;
    }else{
      $scope.isImage = true;
    }
  }


  function clearMarkers(){
    markers.forEach(function(m){
      m.setMap(null);
    });
    markers = [];
  }
});
