'use strict';

angular.module('poseidon')
.controller('ForumNewCtrl', function($rootScope, $window, $scope, $state, $firebaseObject, $http, User, Post){
  $scope.isEdit = false;

  if($state.params.postId){
    $scope.isEdit = true;
    Post.findOne($state.params.postId)
    .then(function(response){
      // console.log('!!!!!!', response);
      $scope.post = response.data;
    })
  }

  $scope.createPost = function(post){
    post.id = $rootScope.activeUser.uid;
    Post.create(post)
    .then(function(){
      $window.swal({title: 'Success!', text: 'Your post was successful!', type: 'success'});
    });
    $scope.post = {};
    $state.go('forum.list');
  };
  $scope.editPost = function(post){
    console.log(post);
    Post.edit(post)
    .then(function(response){
      console.log(response.data);
      $window.swal({title: 'Success!', text: 'Your post was successful!', type: 'success'});
    });
    $scope.post = {};
    $state.go('forum.list');
  };
});
