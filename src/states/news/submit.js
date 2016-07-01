'use strict';

angular.module('app')
	.controller('SubmitCtrl', function($scope, $http, news) {
		$scope.news = {
			vote: 0,
			comments: []
		};
		$scope.addNews = function() {
			news.addNews($scope.news);
		};
	});