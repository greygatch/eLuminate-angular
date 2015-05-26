'use strict';

angular.module('poseidon')
.controller('ForumCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  Post.find()
  .then(function(response){
    console.log('POSTS', response);
    $scope.posts = response.data;
  });

  $scope.createPost = function(post){
    post.id = $rootScope.activeUser.uid;
    Post.create(post)
    .then(function(response){
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
      });
    })
  }
});
