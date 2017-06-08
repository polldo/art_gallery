'use strict';

angular.module('artGallery')
    .factory('AuthorService', function ($http, config) {

        var path = config.path;

        return {

            getAuthor: function (id) {
                return $http({
                    method: 'GET',
                    url: path + '/authors/id/' + id,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getAuthors: function () {
                return $http({
                    method: 'GET',
                    url: path + '/authors/',
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getAuthorsByName: function (name) {
                return $http({
                    method: 'GET',
                    url: path + '/authors/name/' + name,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getAuthorsBySurname: function (surname) {
                return $http({
                    method: 'GET',
                    url: path + '/authors/surname/' + surname,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },
        };
    });