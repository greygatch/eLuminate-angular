'use strict';

angular.module('poseidon')
.controller('ForumListCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  var UID;

  Post.find()
  .then(function(response){
    $scope.posts = response.data;
    console.log($scope.posts);
  });

  User.find()
  .then(function(response){
    $scope.user = response.data;
    UID = response.data._id;
    console.log('UID', UID);
  });

  $scope.isUserPost = function(post){
    return post.userId === UID;
  }

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

  $scope.editPost = function(post){
    $state.go('forum.edit', {postId: post._id});
  };

  $scope.deletePost = function(post){
    Post.destroy(post)
    .then(function(response){
      Post.find()
      .then(function(response3){
        posts = response3.data;
        posts = posts.filter(function(e){
          return e.userId === UID;
        });
        $scope.posts = posts;
      });
    });
  };

});
