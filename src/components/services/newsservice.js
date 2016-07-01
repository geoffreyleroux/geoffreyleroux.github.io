'use strict';
angular.module('service.news', [])
    .factory('news', function($window, $q, $http) {
        var baseURL = "https://infinite-peak-72019.herokuapp.com";
        // var baseURL = "http://localhost:8080";

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

        var updateVote = function(news_id, params) {
            return fetchData({
                method: 'PUT',
                url: baseURL + '/news/' + news_id + '/vote',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: params
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
            updateVote: updateVote,
            getNews: getNews,
            getOneNews: getOneNews,
            addNews: addNews,
            updateOneNews: updateOneNews
        };

        return exports;
    });