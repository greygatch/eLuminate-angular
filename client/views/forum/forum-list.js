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
    console.log(post);
    Post.edit(post)
    .then(function(response){
      console.log(response.data);
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
      });
    });
  }

});
