'use strict';

angular.module('app')
	.controller('WebClientCtrl', function($scope, $rootScope, $http, news) {
		news.getNews();
	});