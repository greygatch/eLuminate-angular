'use strict';

angular.module('poseidon')
.factory('User', function($rootScope, $http, nodeUrl, $window){
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
    var badgeCount = user.badges.length;

    if(user.points > 100 && user.badges.length === 0){
      user.badges.push({
        image: '../assets/badge_one.png',
        description: 'Rookie',
        isAchieved: true
      });
    }else if(user.points > 1000 && user.badges.length === 1){
      user.badges.push({
        image: '../assets/badge_two.png',
        description: 'Novice Scholar',
        isAchieved: true
      });
    }else if(user.points > 5000 && user.badges.length === 2){
      user.badges.push({
        image: '../assets/badge_three.png',
        description: 'Informed Citizen',
        isAchieved: true
      });
    }else if(user.points > 10000 && user.badges.length === 3){
      user.badges.push({
        image: '../assets/badge_four.png',
        description: 'In-the-know',
        isAchieved: true
      });
    }else if(user.points > 100000 && user.badges.length === 4){
      user.badges.push({
        image: '../assets/badge_five.png',
        description: 'eLuminated',
        isAchieved: true
      });
    }
    if(badgeCount !== user.badges.length){
      $window.swal({title: 'New Badge!', text: 'You just unlocked a new badge!!', type: 'success'});
    }

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
