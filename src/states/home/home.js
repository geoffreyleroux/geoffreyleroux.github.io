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

        $scope.goToDetails = function(news_id) {
            $state.go('webclient.news', { id: news_id });
        };
        $scope.goToComments = function(news_id) {
            $state.go('webclient.comments', { id: news_id });
        };

        $scope.voteup = function(newsModel) {
            newsModel.vote++;
            news.updateVote(newsModel._id, newsModel);
        };

        $scope.votedown = function(newsModel) {
            newsModel.vote--;
            news.updateVote(newsModel._id, newsModel);
        };

        refresh();
    });
