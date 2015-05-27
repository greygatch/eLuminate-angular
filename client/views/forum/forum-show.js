'use strict';

angular.module('poseidon')
.controller('ForumShowCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  Post.findOne($state.params.postId)
  .then(function(response){
    $scope.post = response.data;
  });
});
