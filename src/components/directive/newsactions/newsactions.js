angular.module('directive.newsactions', [])
    .directive('newsactions', function(news, $state) {
        return {
            templateUrl: '/components/directive/newsactions/newsactions.html',
            restrict: 'E',
            replace: true,
            scope: {
                news: "=",
            },
            link: function($scope, element, attrs) {

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

            }
        }
    });
