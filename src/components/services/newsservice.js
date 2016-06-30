'use strict';
angular.module('service.news', [])
    .factory('news', function($window, $q, $http) {
        var baseURL = "https://infinite-peak-72019.herokuapp.com";

        var getNews = function() {
            return fetchData({
                method: 'GET',
                url: baseURL + '/news',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        var addNews = function(params) {
            return fetchData({
                method: 'POST',
                url: baseURL + '/news',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params
            });
        };

        var getOneNews = function(id) {
            return fetchData({
                method: 'GET',
                url: baseURL + '/news/' + id,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        };

        var updateOneNews = function(id, params) {
            return fetchData({
                method: 'PUT',
                url: baseURL + '/news/' + id,
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
            getNews: getNews,
            getOneNews: getOneNews,
            addNews: addNews,
            updateOneNews: updateOneNews
        };

        return exports;
    });