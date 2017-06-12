'use strict';

angular.module('artGallery')
    .factory('RoomService', function ($http, config) {

        var path = config.path;

        return {

            getRoom: function (id) {
                return $http({
                    method: 'GET',
                    url: path + '/rooms/id/' + id,
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },

            getRooms: function () {
                return $http({
                    method: 'GET',
                    url: path + '/rooms/',
                    headers: {
                        ContentType: "application/json"
                    }
                });
            },
        };
    });