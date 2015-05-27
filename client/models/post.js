'use strict';

angular.module('poseidon')
.factory('Post', function($rootScope, $http, nodeUrl){
  function Post(){
  }

  Post.find = function(){
    return $http.get(nodeUrl + '/posts');
  }
  Post.create = function(post){
    return $http.post(nodeUrl + '/posts', post);
  }

  Post.findOne = function(postId){
    return $http.get(nodeUrl + '/posts/' + postId);
  }

  return Post;
});
