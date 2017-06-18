'use strict';

angular.module('artGallery')
    .controller('RoomCtrl', function ($scope, RoomService, PaintingService, $uibModal) {

        $scope.roomList = undefined;
        $scope.paintingList = undefined;
        $scope.roomIndex = undefined;
        $scope.paintingIndex = undefined;
        $scope.open = openIndex;
        $scope.setIndex = setPaintingIndex;
        
        loadRoomList();

        function setRoomList(newRoomList) {
            $scope.roomList = newRoomList;
        }
        
        function setPaintingList(newPaintingList) {
            $scope.paintingList = newPaintingList;
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

        function setPaintingIndex(index) {
            if (index === $scope.paintingIndex) $scope.paintingIndex = undefined;
            else $scope.paintingIndex = index;
        }
        
        function openIndex(index, room) {
        	if ($scope.roomIndex != index) {
        		$scope.roomIndex = index;
        		loadPaintingList(room);
        	}
        }
        
        function loadPaintingList(room) {
        	var request;
        	request = PaintingService.getPaintingsByRoom(room);
        	request.then(function (response) {
        		setPaintingList(response.data)
        		}, badResponse);
        }
        
        $scope.openPictureModal = function (id_picture) {
            var modalInstance = $uibModal.open({
                templateUrl: "static/views/fragment/open-picture-modal.html",
                controller: "OpenPictureCtrl",
                size: "custom",
                resolve: {
                    id_picture: function () {
                        return id_picture;
                    }
                }
            });
            modalInstance.result.then(function () {}, function () {});
        }

    });
