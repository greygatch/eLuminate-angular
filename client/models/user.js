'use strict';

angular.module('poseidon')
.factory('User', function($rootScope, $http, nodeUrl){
  function User(){
  }

  User.initialize = function(){
    return $http.post(nodeUrl + '/users');
  };

  User.oauth = function(provider){
    return $rootScope.afAuth.$authWithOAuthPopup(provider);
  };

  User.find = function(){
    return $http.get(nodeUrl + '/users/' + $rootScope.activeUser.uid);
  };

  User.update = function(user){
    return $http.put(nodeUrl + '/users/' + user._id + '/edit', user);
  };

  User.register = function(user){
    return $rootScope.afAuth.$createUser(user);
  };

  User.login = function(user){
    return $rootScope.afAuth.$authWithPassword(user);
  };

  User.logout = function(){
    return $rootScope.afAuth.$unauth();
  };

  return User;
});
