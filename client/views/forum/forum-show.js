'use strict';

angular.module('poseidon')
.controller('ForumShowCtrl', function($rootScope, $scope, $state, $firebaseObject, $http, Post, User){

  Post.findOne($state.params.postId)
  .then(function(response){
    $scope.post = response.data;
  });

  $scope.addComment = function(body){
    var comment = {};
    comment.body = body;
    comment.userId = $scope.post._id;
    var post = $scope.post;
    post.comments.push(comment);

    Post.edit(post)
    .then(function(response){
      $scope.post = response.data;
      commentPoints();
    })
  };
});

function commentPoints(){
  // User.find()
  // .then(function(response){
  //   $rootScope.points = response.data.points;
  //   var user = response.data;
  //   var roll = Math.floor(Math.random() * 25) + 25;
  //   $rootScope.points += roll;
  //   $scope.newPoints += roll;
  //   user.points = $rootScope.points;
  //   delete user.__v;
  //   User.update(user)
  //   .then(function(response){
  //     console.log('successful save: ', response);
  //   });
  // });
}
