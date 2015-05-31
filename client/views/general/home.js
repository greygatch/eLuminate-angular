'use strict';

angular.module('poseidon')
.controller('HomeCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  var markers = [];
  var user;
  $rootScope.i = 0;
  $scope.doneLoading = true;
  $scope.isRead = true;
  $scope.isImage = true;
  $scope.newPoints = 0;
  $scope.dummyUrl = 'https://shafr.org/sites/default/files/field/image/T_logo.gif';
  //
  function clearMarkers(){
    markers.forEach(function(m){
      m.setMap(null);
    });
    markers = [];
  }
  clearMarkers();
  //
  Map.geocode('reykjavik', function(){
    var map = Map.create('#mapDiv2', 25, 0, 2);
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
      var index;
      locations.forEach(function(l){
        var lat;
        var lng;
        Map.geocode(l, function(result){
          if(!result){ return; }
          lat = result[0].geometry.location.A;
          lng = result[0].geometry.location.F;
          Map.addMarker(map, lat, lng, l, '/assets/marker.png');
        });
      });
  //
      $scope.$apply(function(){
        $rootScope.articles = articles;
        $rootScope.article = $rootScope.articles[0];
        $scope.doneLoading = true;
      });
    });
  });
  //
  $rootScope.$watch('article', function(n){
    $scope.article = n;
  });

  $scope.isRead = function(event){
    var roll = Math.floor(Math.random() * 25) + 75;
    $rootScope.points += roll;
    $scope.newPoints += roll;
    user.points = $rootScope.points;
    delete user.__v;
    User.update(user)
    .then(function(response){
      //
    });
  };
  //
  $scope.move = function(direction){
    if(direction === 'next' && $rootScope.i < $scope.articles.length - 1){
      $rootScope.i += 1;
    }else if(direction === 'prev' && $rootScope.i > 0){
      $rootScope.i -= 1;
    }
    $scope.article = $scope.articles[$rootScope.i];
    if(!($scope.article.multimedia[0])){
      $scope.isImage = false;
    }else{
      $scope.isImage = true;
    }
  };
});
