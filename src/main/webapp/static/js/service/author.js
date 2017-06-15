'use strict';

angular.module('artGallery')
    .factory('AuthorService', function ($http, config) {

        var path = config.path;
        var currentAuthor;

        return {

            getCurrentAuthor: function () {
                return currentAuthor;
            },

            setCurrentAuthor: function (author) {
                currentAuthor = author;
            },

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

            addAuthor: function (author) {
                return $http({
                    method: 'POST',
                    url: path + '/authors/',
                    data: author,
                    headers: {
                        ContentType: "application/json",
                        dataType: "json"
                    }
                });
            },

            removeAuthorById: function (id) {
                return $http({
                    method: 'DELETE',
                    url: path + '/authors/id/' + id,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            }

        };
    });