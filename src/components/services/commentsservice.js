'use strict';
angular.module('service.comments', [])
    .factory('comments', function($window, $q, $http) {
        var baseURL = "http://infinite-peak-72019.herokuapp.com";
        // var baseURL = "http://localhost:8080";
        
        var addComments = function(news_id, params) {
            return fetchData({
                method: 'PUT',
                url: baseURL + '/news/' + news_id + '/comments',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params
            });
        };


        var fetchData = function(options, noLoader) {
            var deferred = $q.defer();
            $http(options)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    deferred.reject({
                        error: data
                    });
                });

            return deferred.promise;
        };

        var exports = {
            // getOneNewsComments: getOneNewsComments,
            addComments: addComments
        };

        return exports;
    });
