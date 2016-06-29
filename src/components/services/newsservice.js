'use strict';
angular.module('service.news', [])
    .factory('news', function($window, $q, $http) {
        var baseURL = "https://infinite-peak-72019.herokuapp.com";

        var getNews = function() {
            fetchData({
                method: 'GET',
                url: baseURL + '/news',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                console.log(response);
            }, function(response) {
                console.log(response);
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
            getNews: getNews
        };

        return exports;
    });