'use strict';

angular.module('poseidon')
.controller('NewsCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  var markers = [];
  var user;
  $scope.i = 0;
  $scope.isRead = true;
  $scope.isImage = true;
  $scope.newPoints = 0;
  $scope.dummyUrl = 'https://shafr.org/sites/default/files/field/image/T_logo.gif';

  function clearMarkers(){
    markers.forEach(function(m){
      m.setMap(null);
    });
    markers = [];
  }

  clearMarkers();

  User.find()
  .then(function(response){
    $rootScope.points = response.data.points;
    user = response.data;
  });

  Map.geocode('rome', function(){
    var map = Map.create('#mapDiv', 25, 0, 2);
    $window.jQuery.getJSON('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=d9aaa709a92d3d4ad4efbd1902a469ac:19:72139126', function(response){
      var articles = response.results.filter(function(e){
        return e.geo_facet || e.subsection ? e : null;
      });
      var locations = [];
      articles.forEach(function(e){
        if(!e.multimedia){
          e.multimedia = [];
          e.multimedia[0] = {};
          e.multimedia[0].url = $scope.dummyUrl;
        }
        locations.push(e.geo_facet[0] ? e.geo_facet[0] : e.subsection);
      });
      locations.forEach(function(l){
        var lat;
        var lng;
        Map.geocode(l, function(result){
          if(!result){ return; }
          lat = result[0].geometry.location.A;
          lng = result[0].geometry.location.F;
          Map.addMarker(map, lat, lng, '!', '/assets/marker.png');
        });
      });

      $scope.$apply(function(){
        $scope.articles = articles;
        $scope.article = $scope.articles[0];
      });
    });
  });

  $scope.isRead = function(event){
    var roll = Math.floor(Math.random() * 25) + 75;
    $rootScope.points += roll;
    $scope.newPoints += roll;
    user.points = $rootScope.points;
    delete user.__v;
    User.update(user)
    .then(function(response){
    });
  };

  $scope.move = function(direction){
    if(direction === 'next' && $scope.i < $scope.articles.length - 1){
      $scope.i += 1;
    }else if(direction === 'prev' && $scope.i > 0){
      $scope.i -= 1;
    }
    $scope.article = $scope.articles[$scope.i];
    if(!($scope.article.multimedia[0])){
      $scope.isImage = false;
    }else{
      $scope.isImage = true;
    }
  };
});
