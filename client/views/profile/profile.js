'use strict';

angular.module('poseidon')
.controller('ProfileCtrl', function($scope, $state, $window, User, Post){
  var posts;
  var UID;

  User.find()
  .then(function(response){
    $scope.user = response.data;
    UID = response.data._id;
    console.log(UID);
    Post.find()
    .then(function(response){
      posts = response.data;
      posts = posts.filter(function(e){
        return e.userId === UID;
      });
      $scope.posts = posts;
    });
  })

  $scope.updateProfile = function(profile){
    delete $scope.user.__v;
    $scope.user.username = profile.username;
    $scope.user.avatar = profile.avatar;
    User.update($scope.user)
    .then(function(response){
      $scope.user = response.data;
      $window.swal({title: 'Success!', text: 'Your profile has been updated!', type: 'success'});
    });
  };
  $scope.editPost = function(post){
    console.log(post);
  }
  $scope.deletePost = function(post){
    console.log(post);
  }
});
