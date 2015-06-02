'use strict';

angular.module('poseidon')
.controller('ForumListCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  var UID;

  Post.find()
  .then(function(response){
    $scope.posts = response.data;
  });

  User.find()
  .then(function(response){
    $scope.user = response.data;
    UID = response.data._id;
  });

  $scope.isUserPost = function(post){
    return post.userId === UID;
  }

  $scope.upvote = function(post){
    console.log(post);
    console.log(post.comments);

    if(post.usersVoted.indexOf(UID) === -1){
      post.usersVoted.push(UID);
      post.votes += 1;
      Post.edit(post)
      .then(function(response){
        Post.find()
        .then(function(response){
          $scope.posts = response.data;
        });
      });
    }

  }

  $scope.editPost = function(post){
    $state.go('forum.edit', {postId: post._id});
  };

  $scope.deletePost = function(post){
    Post.destroy(post)
    .then(function(response){
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
      });
    });
  };

});
