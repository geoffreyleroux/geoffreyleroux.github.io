'use strict';

angular.module('app')
    .controller('WebClientCtrl', function($scope, $rootScope, $http, $state) {
        $scope.activeMenu = $state.params.filter ? $state.params.filter : $state.current.menu;

        var goTo = function(ref, filter) {
            $state.go(ref, {
                filter: filter
            });
        };

        $scope.goTo = function(ref) {
            goTo(ref);
        };

        $scope.filterByCommentsCount = function() {
            goTo('webclient.home', "comments");
        };

        $scope.filterByVotes = function() {
            goTo('webclient.home', "vote");
        };
        
        $scope.filterByDate = function() {
            goTo('webclient.home', "createDate");
        };

        var unregister = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.activeMenu = $state.params.filter ? $state.params.filter : $state.current.menu;
        });

        $scope.$on('$destroy', function() {
            unregister();
        });
    });
