'use strict';

angular.module('poseidon')
.controller('ForumListCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  Post.find()
  .then(function(response){
    $scope.posts = response.data;
  });
});
