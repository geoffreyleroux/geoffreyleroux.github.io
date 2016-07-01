'use strict';

angular.module('app')
    .controller('HomeCtrl', function($scope, $http, news, $state, $filter) {
        $scope.reverse = true;
        var refresh = function() {
            $scope.loadingNews = true;
            news.getNews().then(function(data) {
                $scope.news = data;
                $scope.loadingNews = false;
                if ($state.params.filter) {
                    $scope.sortby = $state.params.filter;
                    if ($scope.sortby == "comments") {
                        $scope.sortby = 'comments.length';
                    }
                }
                _.each($scope.news, function(n) {
                    n.createDate = moment(n.createDate).fromNow();
                });
            });
        };

        refresh();
    });
