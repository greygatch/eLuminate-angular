angular.module('poseidon')
.controller('ForumListCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  var posts;
  var UID;
  User.find()
  .then(function(response){
    UID = response.data._id;
  })
  Post.find()
  .then(function(response){
    posts = response.data;
    $scope.posts = posts;
  });
});
