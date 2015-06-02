'use strict';

angular.module('poseidon')
.controller('ForumShowCtrl', function($rootScope, $scope, $state, $window, $http, Post, User){
  var UID;

  Post.findOne($state.params.postId)
  .then(function(response){
    $scope.post = response.data;
  });

  User.find()
  .then(function(response){
    UID = response.data._id;
  });

  $scope.addComment = function(body){
    var comment = {};
    comment.body = body;
    comment.userId = $scope.post._id;
    comment.usersVoted = UID;
    var post = $scope.post;
    post.comments.push(comment);

    Post.edit(post)
    .then(function(response){
      $scope.post = response.data;
      commentPoints();
      $scope.body = null;
      $window.swal({title: 'Success!', text: 'Your post was successful!', type: 'success'});
    });
  };
  $scope.upvote = function(comment, post){
    if(comment.usersVoted.indexOf(UID) === -1){
      comment.usersVoted.push(UID);
      comment.votes += 1;
      Post.edit(post)
      .then(function(response){
        Post.find()
        .then(function(response){
          $scope.posts = response.data;
        });
      });
    }
  };
  function commentPoints(){
    User.find()
    .then(function(response){
      $rootScope.points = response.data.points;
      var user = response.data;
      var roll = Math.floor(Math.random() * 25) + 25;
      $rootScope.points += roll;
      $scope.newPoints += roll;
      user.points = $rootScope.points;
      delete user.__v;
      User.update(user)
      .then(function(response){
        console.log('successful save: ', response);
      });
    });
  }
});
