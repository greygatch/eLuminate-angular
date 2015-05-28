'use strict';

angular.module('poseidon')
.controller('ForumListCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  Post.find()
  .then(function(response){
    $scope.posts = response.data;
    console.log($scope.posts);
  });
  $scope.upvote = function(post){
    post.votes += 1;
    Post.edit(post)
    .then(function(response){
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
      });
    });
  }

});
