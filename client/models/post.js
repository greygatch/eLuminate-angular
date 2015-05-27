'use strict';

angular.module('poseidon')
.factory('Post', function($rootScope, $http, nodeUrl){
  function Post(){
  }

  Post.create = function(post){
    return $http.post(nodeUrl + '/posts', post);
  };

  Post.find = function(){
    return $http.get(nodeUrl + '/posts');
  };

  Post.findOne = function(postId){
    return $http.get(nodeUrl + '/posts/' + postId);
  };

  Post.edit = function(post){
    return $http.put(nodeUrl + '/posts/' + post._id + '/edit', post);
  };

  Post.destroy = function(post){
    return $http.delete(nodeUrl + '/posts/' + post._id + '/destroy', post);
  };

  return Post;
});
