'use strict';

angular.module('artGallery')
    .factory('PaintingService', function ($http, config) {

        var path = config.path;

        return {

            getPainting: function (id) {
                return $http({
                    method: 'GET',
                    url: path + '/paintings/id/' + id,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getPaintings: function () {
                return $http({
                    method: 'GET',
                    url: path + '/paintings/',
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getPaintingsByTitle: function (title) {
                return $http({
                    method: 'GET',
                    url: path + '/paintings/title/' + name,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getPaintingsByMedium: function (medium) {
                return $http({
                    method: 'GET',
                    url: path + '/paintings/medium/' + surname,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },
            
            getPaintingsByYear: function (year) {
                return $http({
                    method: 'GET',
                    url: path + '/paintings/year/' + surname,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },
        };
    });