'use strict';

angular.module('poseidon')
.controller('ProfileCtrl', function($scope, $state, $window, User){
  User.find()
  .then(function(response){
    $scope.user = response.data;
  });
  $scope.updateProfile = function(profile){
    delete $scope.user.__v;
    console.log(profile);
    $scope.user.username = profile.username;
    $scope.user.avatar = profile.avatar;
    User.update($scope.user)
    .then(function(response){
      $scope.user = response.data;
    });
  };
});
