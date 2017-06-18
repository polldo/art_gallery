'use strict';

angular.module('artGallery')
    .controller('PaintingAdminCtrl', function ($scope, $uibModal, PaintingService, message, fileUpload) {
    	
    	$scope.alertInfo = undefined;
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

        function responseToAlert(alertType, details) {
        	$scope.alertInfo = [];
            message.addAlert(alertType, details);
        }

        function loadPaintingList() {
            var request;
            var param = getSearchParam();
            var filter = getSelectedFilter();
            if (filter === "title") request = PaintingService.getPaintingsByTitle(param);
            else if (filter === "medium") request = PaintingService.getPaintingsByMedium(param);
            else if (filter === "year") request = PaintingService.getPaintingsByYear(param);
            else request = PaintingService.getPaintings();
            request.then(function (response) {
                    setPaintingList(response.data);
                    //responseToAlert("success", "Paintings loaded");
                },
                function (response) {
                    responseToAlert("danger", "Error while loading Paintings")
                });
        }

        function uploadFile(painting, file, okDetails) {
            fileUpload.uploadPicture(file, painting.id)
                .then(function (resp) {
                    responseToAlert("success", okDetails);
                    loadPaintingList();
                }, function (resp) {
                    responseToAlert("danger", "Failed to upload painting picture");
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
                var badDetails, okDetails;
                if (painting.id === undefined) {
                    badDetails = "Unable to add this Painting";
                    okDetails = "Painting added";
                }
                else {
                    badDetails = "Unable to modify this Painting";
                    okDetails = "Painting modified";
                }
                PaintingService.addPainting(painting)
                    .then(function (response) {
                            responseToAlert("success", okDetails);
                            if (file !== undefined) {
                                var addedPainting = response.data;
                                uploadFile(addedPainting, file, okDetails);
                            }
                            else
                                loadPaintingList();
                        },
                        function (response) {
                        	responseToAlert("danger", badDetails);
                        	var errMessage = [];
                            for(var i = 0, size = response.data.length; i < size ; i++) {
                            	errMessage[i] = response.data[i].defaultMessage;
                            }
                            $scope.alertInfo = errMessage;                           
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
                    .then(function (response) {
                            responseToAlert("success", "Painting deleted");
                            loadPaintingList();
                        },
                        function (response) {
                            responseToAlert("success", "Unable to delete this Painting");
                        });
            }, function () {
            });
        };

    });
