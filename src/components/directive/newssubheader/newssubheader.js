angular.module('directive.newssubheader', [])
    .directive('newssubheader', function() {
        return {
            templateUrl: '/components/directive/newssubheader/newssubheader.html',
            restrict: 'E',
            replace: true,
            scope: "=",
            link: function($scope, element, attrs) {

            }
        }
    });
