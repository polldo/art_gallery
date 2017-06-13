'use strict';

angular.module('artGallery')
    .controller('ModifyPaintingCtrl', function ($scope, $uibModalInstance, painting, AuthorService, RoomService) {

        $scope.oldAuthor = painting.author;
        $scope.oldRoom = painting.room;

        $scope.hasAuthor = function () {
            return $scope.oldAuthor !== undefined;
        };
        $scope.hasRoom = function () {
            return $scope.oldRoom !== undefined;
        };
        $scope.getPaintingSource = function () {
            if (painting.id !== undefined)
                return "/artgallery/pictures/id/" + painting.id;
            return "/artgallery/static/images/default.png";
        };

        loadAuthors();
        loadRooms();
        initParams();

        function loadAuthors () {
            AuthorService.getAuthors().then(function (resp) {
                $scope.paintingAuthor = {
                    selected: undefined,
                    availableAuthors: resp.data
                };
            }, function () {
                $scope.title = "ERROR LOADING AUTHORS"
            });
        }

        function loadRooms () {
            RoomService.getRooms().then(function (resp) {
                $scope.paintingRoom = {
                    selected: undefined,
                    availableRooms: resp.data
                };
            }, function () {
                $scope.title = "ERROR LOADING AUTHORS"
            });
        }

        function initParams () {
            $scope.painting = painting;
            if ($scope.painting.id === undefined)
                $scope.title = 'Insert new painting';
            else
                $scope.title = 'Update painting ' + $scope.painting.title;
            $scope.newTitle = $scope.painting.title;
            $scope.newHeight = $scope.painting.height;
            $scope.newWidth = $scope.painting.width;
            $scope.newMedium = $scope.painting.medium;
            $scope.newYear = $scope.painting.year;
        }

        $scope.ok = function () {
            $scope.painting.title = $scope.newTitle;
            $scope.painting.height = $scope.newHeight;
            $scope.painting.width = $scope.newWidth;
            $scope.painting.medium = $scope.newMedium;
            $scope.painting.year = $scope.newYear;
            if ($scope.paintingAuthor.selected !== undefined)
                $scope.painting.author = $scope.paintingAuthor.selected;
            if ($scope.paintingRoom.selected !== undefined)
                $scope.painting.room = $scope.paintingRoom.selected;
            var upload = {
                painting: $scope.painting,
                file: $scope.newFile
            };
            $uibModalInstance.close(upload);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });