'use strict';

angular.module('poseidon')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('news', {url: '/news', templateUrl: '/views/newsmap/news.html', controller: 'NewsCtrl'})
  .state('profile', {url: '/profile', templateUrl: '/views/profile/profile.html', controller: 'ProfileCtrl'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})

  .state('forum', {url: '/forum', templateUrl: '/views/forum/forum.html', abstract: true})
  .state('forum.list', {url: '/', templateUrl: '/views/forum/forum-list.html', controller: 'ForumListCtrl'})
  .state('forum.new', {url: '/new', templateUrl: '/views/forum/forum-new.html', controller: 'ForumNewCtrl'})
  .state('forum.edit', {url: '/edit/{postId}', templateUrl: '/views/forum/forum-new.html', controller: 'ForumNewCtrl'})
  .state('forum.show', {url: '/{postId}', templateUrl: '/views/forum/forum-show.html', controller: 'ForumShowCtrl'});
});
