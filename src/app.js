'use strict';

angular.module("app", [
    'ngSanitize',
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'ng.deviceDetector',

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
            url: '/home',
            templateUrl: '/states/home/home.html',
            controller: 'HomeCtrl',
            menu: "home"
        });


})

.run(function($location, $window, $rootScope, $state) {
    console.log("run")
});
