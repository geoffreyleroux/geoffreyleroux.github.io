'use strict';

angular.module('app')
    .controller('HomeCtrl', function($scope, $http, news, comments, $timeout) {
        news.getNews().then(function(data) {
            $scope.news = data;
            _.each($scope.news, function(news) {
                comments.getOneNewsComments(news._id).then(function(data) {
                    news.news_comments = data;
                });
            });

            // comments.addComments({
            //     author: "test",
            //     content: "Test first news content",
            //     news_id: $scope.news[0]._id
            // });
        });
        // news.addNews({
        //     content: "Test first news content",
        //     link: "http://0.0.0.0:9002/webclient/home",
        //     title: "Test first news title",
        //     vote: 0
        // });

    });
