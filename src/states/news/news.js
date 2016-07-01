'use strict';

angular.module('app')
    .controller('NewsCtrl', function($scope, $http, news, comments, $timeout, $state) {
        var refresh = function() {
            news.getOneNews($state.params.id).then(function(data) {
                $scope.news = data;
                $scope.news.createDate = moment($scope.news.createDate).fromNow();
            });
        };

        refresh();
    });
