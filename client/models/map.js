angular.module('poseidon')
.factory('Map', function($window, $rootScope, $state){
  function Map(){}

  Map.geocode = function(address, cb){
    var geocoder = new $window.google.maps.Geocoder();
    geocoder.geocode({address: address}, cb);
  };
  Map.create = function(selector, lat, lng, zoom){
    var options = {
      center: new $window.google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: $window.google.maps.MapTypeId.ROADMAP,
      styles: [{'featureType':'water','elementType':'geometry','stylers':[{'color':'#193341'}]},{'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#2c5a71'}]},{'featureType':'road','elementType':'geometry','stylers':[{'color':'#29768a'},{'lightness':-37}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#406d80'}]},{'featureType':'transit','elementType':'geometry','stylers':[{'color':'#406d80'}]},{'elementType':'labels.text.stroke','stylers':[{'visibility':'on'},{'color':'#3e606f'},{'weight':2},{'gamma':0.84}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'featureType':'administrative','elementType':'geometry','stylers':[{'weight':0.6},{'color':'#1a3541'}]},{'elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#2c5a71'}]}]
    };


    selector = angular.element(selector).get(0);
    var map = new $window.google.maps.Map(selector, options);
    return map;
  };
  Map.addMarker = function(map, lat, lng, name, icon){
    var latLng = new $window.google.maps.LatLng(lat, lng);
    var marker = new $window.google.maps.Marker({
      map: map,
      position: latLng,
      title: name,
      animation: $window.google.maps.Animation.DROP,
      icon: icon
    });
    google.maps.event.addListener(marker, 'click', function() {
      if(!$rootScope.activeUser){ $state.go('login'); }
      var geoLoc = this.title;
      var index = 0;
      $rootScope.articles.forEach(function(e){
        if(e.geo_facet[0] === geoLoc || e.subsection === geoLoc){
          $rootScope.$apply(function(){
            $rootScope.article = e;
            $rootScope.i = index;
            $rootScope.isGeoLoc = e.geo_facet[0] ? true : false;
          });
        }
        index++;
      });
    });
    return marker;
  };
  return Map;
});
