'use strict';

angular.module('poseidon')
.controller('ProfileCtrl', function($scope, $state, $window, User, Post){
  var posts;
  var UID;
  $scope.hasPosts = false;

  User.find()
  .then(function(response){
    $scope.user = response.data;
    $scope.badges = $scope.user.badges;
    $scope.hasProfile = $scope.user.avatar ? true : false;

    UID = response.data._id;
    Post.find()
    .then(function(response2){
      posts = response2.data;
      posts = posts.filter(function(e){
        return e.userId === UID;
      });
      $scope.posts = posts;
      $scope.hasPosts = $scope.posts.length > 0 ? true : false;
    });
  });

  $scope.updateProfile = function(profile){
    delete $scope.user.__v;
    $scope.user.username = profile.username;
    $scope.user.avatar = profile.avatar;
    User.update($scope.user)
    .then(function(reply){
      $scope.user = reply.data;
      $scope.hasProfile = $scope.user.avatar ? true : false;
      $window.swal({title: 'Success!', text: 'Your profile has been updated!', type: 'success'});
    });
  };
  $scope.editPost = function(post){
    $state.go('forum.edit', {postId: post._id});
  };
  $scope.deletePost = function(post){
    Post.destroy(post)
    .then(function(){
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
