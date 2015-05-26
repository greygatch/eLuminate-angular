'use strict';

angular.module('poseidon')
.controller('ForumCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  $scope.createPost = function(post){
    post.id = $rootScope.activeUser.uid;
    Post.create(post)
    .then(function(response){
      console.log(response);
    })
  }
});
