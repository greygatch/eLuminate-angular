'use strict';

angular.module('poseidon')
.controller('ForumListCtrl', function($rootScope, $scope, $state, $window, $firebaseObject, $http, User, Post){
  var UID;


  Post.find()
  .then(function(response){
    $scope.posts = response.data;
  });

  User.find()
  .then(function(response){
    $scope.user = response.data;
    UID = response.data._id;
  });

  $window.jQuery.getJSON('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=d9aaa709a92d3d4ad4efbd1902a469ac:19:72139126', function(response){
    var articles = response.results.filter(function(e){
      return e.geo_facet || e.subsection ? e : null;
    });
    articles = articles.splice(0,9);
    $scope.$apply(function(){
      $rootScope.articles = articles;
    });
  });

  $scope.isUserPost = function(post){
    return post.userId === UID;
  };

  $scope.upvote = function(post){
    if(post.usersVoted.indexOf(UID) === -1){
      post.usersVoted.push(UID);
      post.votes += 1;
      Post.edit(post)
      .then(function(response){
        Post.find()
        .then(function(response){
          $scope.posts = response.data;
        });
      });
    }
  };

  $scope.editPost = function(post){
    $state.go('forum.edit', {postId: post._id});
  };

  $scope.deletePost = function(post){
    Post.destroy(post)
    .then(function(response){
      Post.find()
      .then(function(response){
        $scope.posts = response.data;
      });
    });
  };
});
