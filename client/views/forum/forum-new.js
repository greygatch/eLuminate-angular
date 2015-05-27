angular.module('poseidon')
.controller('ForumNewCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, User, Post){
  $scope.createPost = function(post){
    post.id = $rootScope.activeUser.uid;
    Post.create(post)
    .then(function(response){
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
      });
    })
  };
});
