'use strict';

angular.module('poseidon')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('news', {url: '/news', templateUrl: '/views/newsmap/news.html', controller: 'NewsCtrl'})
  .state('forum', {url: '/forum', templateUrl: '/views/forum/forum.html'})
  .state('profile', {url: '/profile', templateUrl: '/views/profile/profile.html', controller: 'ProfileCtrl'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'});
});
