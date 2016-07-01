'use strict';

angular.module('app')
    .controller('SubmitCtrl', function($scope, $http, news, dialog, $state) {
        $scope.news = {
            vote: 0,
            comments: []
        };
        $scope.addNews = function() {
            news.addNews($scope.news).then(function() {
                dialog.confirm("News successfully added.");
                $state.go('webclient.home');
            });
        };

    });
