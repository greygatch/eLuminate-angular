'use strict';

angular.module('poseidon')
.controller('ForumNewCtrl', function($rootScope, $window, $scope, $state, $firebaseObject, $http, User, Post){
  $scope.createPost = function(post){
    post.id = $rootScope.activeUser.uid;
    Post.create(post)
    .then(function(){
      $window.swal({title: 'Success!', text: 'Your post was successful!', type: 'success'});
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
      });
    });
    $scope.post = {};
    $state.go('forum.list');
  };
});
