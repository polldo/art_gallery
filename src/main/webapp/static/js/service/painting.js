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
                    url: path + '/paintings/title/' + title,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getPaintingsByMedium: function (medium) {
                return $http({
                    method: 'GET',
                    url: path + '/paintings/medium/' + medium,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },
            
            getPaintingsByYear: function (year) {
                return $http({
                    method: 'GET',
                    url: path + '/paintings/year/' + year,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            addPainting: function (painting) {
                return $http({
                    method: 'POST',
                    url: path + '/paintings/',
                    data: painting,
                    headers: {
                        ContentType: "application/json",
                        dataType: "json"
                    }
                });
            },


            removePaintingById: function (id) {
                return $http({
                    method: 'DELETE',
                    url: path + '/paintings/id/' + id,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            }
        };
    });