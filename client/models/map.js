angular.module('poseidon')
.factory('Map', function($window){
  function Map(){}

  Map.create = function(selector, lat, lng, zoom){
    var options = {
      center: new $window.google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: $window.google.maps.MapTypeId.ROADMAP
    };

    selector = angular.element(selector).get(0);
    var map = new $window.google.maps.Map(selector, options);
    return map;
  };

  Map.geocode = function(address, cb){
    console.log('address: ', address);
    var geocoder = new $window.google.maps.Geocoder();
    geocoder.geocode({address: address}, cb);
  };

  return Map;
})
