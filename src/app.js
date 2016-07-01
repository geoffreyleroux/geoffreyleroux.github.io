'use strict';

angular.module("app", [
    'ngSanitize',
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    
    'directive.autofocus',

    'service.news',
    'service.comments'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;

    $urlRouterProvider.otherwise('/webclient/home');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state('webclient', {
            url: '/webclient',
            templateUrl: '/states/webclient.html',
            controller: 'WebClientCtrl',
            abstract: true,
        })
        .state('webclient.home', {
            url: '/home/:filter',
            templateUrl: '/states/home/home.html',
            controller: 'HomeCtrl'
        })
        .state('webclient.comments', {
            url: '/comments/:id',
            templateUrl: '/states/comments/comments.html',
            controller: 'CommentsCtrl'
        })
        .state('webclient.news', {
            url: '/news/:id',
            templateUrl: '/states/news/news.html',
            controller: 'NewsCtrl'
        })
        .state('webclient.submit', {
            url: '/submit',
            templateUrl: '/states/news/submit.html',
            controller: 'SubmitCtrl',
            menu: 'submit'
        });


})

.run(function($location, $window, $rootScope, $state) {
    console.log("run")
});
