'use strict';

angular.module('poseidon')
.factory('Post', function($rootScope, $http, nodeUrl){
  function Post(){
  }

  Post.create = function(post){
    return $http.post(nodeUrl + '/posts', post)
  }

  return Post;
});
