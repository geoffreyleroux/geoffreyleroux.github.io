'use strict';

angular.module('app')
    .controller('CommentsCtrl', function($scope, $http, news, comments, $state, dialog) {
        $scope.comment = "";
        var refresh = function() {
            $scope.loadingComments = true;
            news.getOneNews($state.params.id).then(function(data) {
                $scope.news = data;
                $scope.news.createDate = moment($scope.news.createDate).fromNow();
                $scope.loadingComments = false;
            });
        };

        $scope.addComment = function() {
            var comment = {
                author: "geoffrey leroux",
                content: $scope.comment
            };
            comments.addComments($scope.news._id, comment).then(function() {
                refresh();
                dialog.confirm("Comment successfully added.");
            });
        }

        refresh();
    });
