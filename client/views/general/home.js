'use strict';

angular.module('poseidon')
.controller('HomeCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, Map, User){
  var markers = [];
  var user;

  $scope.isImage = true;

  function clearMarkers(){
    markers.forEach(function(m){
      m.setMap(null);
    });
    markers = [];
  }
  
  clearMarkers();

  $scope.checkUserStatus = function(){
    var newUser = $rootScope.activeUser ? true : false;
    if(newUser){
      $state.go('news');
    }else{
      $state.go('login');
    }
  };

  Map.geocode('reykjavik', function(){
    var map = Map.create('#mapDiv2', 25, 0, 2);
    // $window.jQuery.getJSON('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=d9aaa709a92d3d4ad4efbd1902a469ac:19:72139126', function(response){
    //
    //   var articles = response.results.filter(function(e){
    //     return e.geo_facet || e.subsection ? e : null;
    //   });
    //   console.log(articles);
      // var locations = [];
      // articles.forEach(function(e){
      //   if(!e.multimedia){
      //     e.multimedia = [];
      //     e.multimedia[0] = {};
      //     e.multimedia[0].url = $scope.dummyUrl;
      //   }
      //   locations.push(e.geo_facet[0] ? e.geo_facet[0] : e.subsection);
      // });
      // locations.forEach(function(l){
      //   var lat;
      //   var lng;
      //   Map.geocode(l, function(result){
      //     if(!result){ console.log('test2'); }
      //     lat = result[0].geometry.location.A;
      //     lng = result[0].geometry.location.F;
      //     Map.addMarker(map, lat, lng, l, '/assets/marker.png');
      //   });
      // });
    // });
  });
});
