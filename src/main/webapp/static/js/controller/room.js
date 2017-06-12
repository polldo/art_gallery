'use strict';

angular.module('artGallery')
    .controller('RoomCtrl', function ($scope, RoomService) {

        $scope.roomList = undefined;

        loadRoomList();

        function setRoomList(newRoomList) {
            $scope.roomList = newRoomList;
        }

        function okResponse(response) {
            setRoomList(response.data);
        }

        function badResponse(response) {
            //here a boolean var has to be changed
        }

        function loadRoomList() {
            var request;
            request = RoomService.getRooms();
            request.then(okResponse, badResponse);
        }

    });
