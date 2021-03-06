'use strict';

angular.module('poseidon')
.controller('ForumNewCtrl', function($rootScope, $window, $scope, $state, $firebaseObject, $http, User, Post){
  var user;
  var UID;
  $scope.isEdit = false;

  function postingPoints(){
    User.find()
    .then(function(response){
      $rootScope.points = response.data.points;
      user = response.data;
      var roll = Math.floor(Math.random() * 25) + 25;
      $rootScope.points += roll;
      $scope.newPoints += roll;
      user.points = $rootScope.points;
      delete user.__v;
      User.update(user)
      .then(function(){
        console.log('successful save');
      });
    });
  }

  User.find()
  .then(function(response){
    UID = response.data._id;
  });

  if($state.params.postTitle){
    $scope.post = {};
    $scope.post.title = 'RE: ' + $state.params.postTitle;
  }
  if($state.params.postId){
    $scope.isEdit = true;
    Post.findOne($state.params.postId)
    .then(function(response){
      $scope.post = response.data;
    });
  }

  $scope.createPost = function(post){
    post.id = $rootScope.activeUser.uid;
    post.usersVoted = [];
    post.usersVoted.push(UID);
    Post.create(post)
    .then(function(){
      $window.swal({title: 'Success!', text: 'Your post was successful!', type: 'success'});
    })
    .catch(function(){
      $window.swal({title: 'Error!', text: 'Either your title or body was too short.', type: 'error'});
    });
    postingPoints();

    $scope.post = {};
    $state.go('forum.list');
  };
  $scope.editPost = function(post){
    Post.edit(post)
    .then(function(){
      $window.swal({title: 'Success!', text: 'Your post was successful!', type: 'success'});
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
        $scope.post = {};
        $state.go('forum.list');
      });
    });
  };
});
