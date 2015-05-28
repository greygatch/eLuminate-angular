'use strict';

angular.module('poseidon')
.controller('ForumShowCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  Post.findOne($state.params.postId)
  .then(function(response){
    $scope.post = response.data;
  });

  $scope.addComment = function(body){
    console.log($scope.post);
    var comment = {};
    comment.body = body;
    comment.userId = $scope.post._id;

    var post = $scope.post;

    post.comments.push(comment);

    Post.edit(post)
    .then(function(response){
      $scope.post = response.data;
    })
  };
});
