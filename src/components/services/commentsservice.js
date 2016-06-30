'use strict';
angular.module('service.comments', [])
    .factory('comments', function($window, $q, $http) {
        // var baseURL = "http://infinite-peak-72019.herokuapp.com";
        var baseURL = "http://localhost:8080";


        var getOneNewsComments = function(news_id) {
            return fetchData({
                method: 'GET',
                url: baseURL + '/comments/' + news_id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        var addComments = function(params) {
            return fetchData({
                method: 'POST',
                url: baseURL + '/comments',
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
            getOneNewsComments: getOneNewsComments,
            addComments: addComments
        };

        return exports;
    });
