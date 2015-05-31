'use strict';

angular.module('poseidon')
.controller('NewsCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  var locations = [];
  var markers = [];
  var user;
  $rootScope.i = 0;
  $scope.doneLoading = true;
  $scope.isRead = true;
  $scope.isImage = true;
  $rootScope.isGeoLoc = false;
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

  Map.geocode('sevastopol, ukraine', function(){
    var map = Map.create('#mapDiv', 25, 0, 2);
    $window.jQuery.getJSON('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=d9aaa709a92d3d4ad4efbd1902a469ac:19:72139126', function(response){
      var articles = response.results.filter(function(e){
        return e.geo_facet || e.subsection ? e : null;
      });

      articles.forEach(function(e){
        if(!e.multimedia){
          e.multimedia = [];
          e.multimedia[0] = {};
          e.multimedia[0].url = $scope.dummyUrl;
        }
        if(e.geo_facet){
          locations.push(e.geo_facet[0]);
        }
      });
      locations.forEach(function(l){
        var lat;
        var lng;
        Map.geocode(l, function(result){
          console.log('Marker ', locations.indexOf(l) + 1);
          if(result){
            $scope.$apply(function(){
              lat = result[0].geometry.location.A;
              lng = result[0].geometry.location.F;
              Map.addMarker(map, lat, lng, l, '/assets/marker.png');
            });
          }
        });
      });

      $scope.$apply(function(){
        $rootScope.articles = articles;
        $rootScope.article = $rootScope.articles[0];
        $scope.doneLoading = true;
      });
    });
  });

  $rootScope.$watch('article', function(n){
    $scope.article = n;
  });

  $scope.newPost = function(){
    $state.go('forum.postEdit', {postTitle: $scope.article.title});
  }

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
    if(direction === 'next' && $rootScope.i < $scope.articles.length - 1){
      $rootScope.i += 1;
    }else if(direction === 'prev' && $rootScope.i > 0){
      $rootScope.i -= 1;
    }
    $scope.article = $scope.articles[$rootScope.i];
    $rootScope.isGeoLoc = $scope.article.geo_facet[0] ? true : false;
    if(!($scope.article.multimedia[0])){
      $scope.isImage = false;
    }else{
      $scope.isImage = true;
    }
  };

  $scope.changeMap = function(){
    var mapChange;
    if($scope.article.geo_facet[0]){
      Map.geocode($scope.article.geo_facet[0], function(response){
        var lat = response[0].geometry.location.A;
        var lng = response[0].geometry.location.F;
        mapChange = Map.create('#mapDiv', lat, lng, 6);
        locations.forEach(function(l){
          Map.geocode(l, function(result){
            if(!result){ return; }
            var lat = result[0].geometry.location.A;
            var lng = result[0].geometry.location.F;
            Map.addMarker(mapChange, lat, lng, l, '/assets/marker.png');
          });
        });
      });

    }
    var roll = Math.floor(Math.random() * 25) + 10;
    $rootScope.points += roll;
    $scope.newPoints += roll;
    user.points = $rootScope.points;
    delete user.__v;
    User.update(user)
    .then(function(response){

    });
  }
});
