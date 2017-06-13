'use strict';

angular.module('artGallery')
    .controller('PaintingAdminCtrl', function ($scope, $uibModal, PaintingService, message, fileUpload) {

        $scope.paintingList = undefined;
        $scope.paintingFilter = {
            selected: "no filter",
            availableFilters: ["no filter", "title", "medium", "year"]
        };
        $scope.searchParam = "";
        $scope.searchPaintings = loadPaintingList;

        message.eraseAlerts();
        loadPaintingList();

        function getSelectedFilter() {
            return $scope.paintingFilter.selected;
        }

        function getPaintingList() {
            return $scope.paintingList;
        }

        function getSearchParam() {
            var param = $scope.searchParam;
            if (param === "") {
                return "undefined";
            }
            return param;
        }

        function setPaintingList(newPaintingList) {
            $scope.paintingList = newPaintingList;
        }

        function okResponse(response) {
            setPaintingList(response.data);
            message.eraseAlerts();
        }

        function badResponse(response, details) {
            //here a boolean var has to be changed
            message.addAlert("danger", details);
        }

        function loadPaintingList() {
            var request;
            var param = getSearchParam();
            var filter = getSelectedFilter();
            if (filter === "title") request = PaintingService.getPaintingsByTitle(param);
            else if (filter === "medium") request = PaintingService.getPaintingsByMedium(param);
            else if (filter === "year") request = PaintingService.getPaintingsByYear(param);
            else request = PaintingService.getPaintings();
            request.then(okResponse, badResponse);
        }

        function uploadFile(painting, file) {
            fileUpload.uploadFileToUrl(file, painting.id)
                .then(loadPaintingList, function (resp) {
                    badResponse(resp, "Failed to upload picture");
                });
        }

        //Modify Modal
        $scope.openModifyModal = function (painting) {
            if (painting === undefined)
                painting = {
                    title: '',
                    height: 0,
                    width: 0,
                    medium: '',
                    year: 1990,
                    author: undefined,
                    room: undefined
                };
            var modalInstance = $uibModal.open({
                templateUrl: "static/views/fragment/modify-painting-modal.html",
                controller: "ModifyPaintingCtrl",
                resolve: {
                    painting: function () {
                        return angular.copy(painting);
                    }
                }
            });

            modalInstance.result.then(function (upload) {
                var painting = upload.painting;
                var file = upload.file;
                var details;
                if (painting.id === undefined)
                    details = "Unable to add this Painting";
                else
                    details = "Unable to modify this Painting";
                PaintingService.addPainting(painting)
                    .then(function (response) {
                            if (file !== undefined) {
                                var addedPainting = response.data;
                                uploadFile(addedPainting, file);
                            }
                            else
                                loadPaintingList();
                        },
                        function (response) {
                            badResponse(response, details)
                        });
            }, function () {
            });
        };

        //Delete Modal
        $scope.openDeleteModal = function (painting) {
            var modalInstance = $uibModal.open({
                templateUrl: "static/views/fragment/delete-painting-modal.html",
                controller: "DeletePaintingCtrl",
                resolve: {
                    painting: function () {
                        return painting;
                    }
                }
            });

            modalInstance.result.then(function (painting) {
                PaintingService.removePaintingById(painting.id)
                    .then(loadPaintingList,
                        function (response) {
                            badResponse(response, "Unable to delete this Painting")
                        });
            }, function () {
            });
        };

    });
