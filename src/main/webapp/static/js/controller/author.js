'use strict';

angular.module('artGallery')
    .controller('AuthorCtrl', function ($scope, $uibModal, AuthorService, PaintingService, message, fileUpload) {

        $scope.authorList = undefined;
        $scope.authorFilter = {
            selected: "no filter",
            availableFilters: ["no filter", "name", "surname"]
        };
        $scope.searchParam = "";
        $scope.searchAuthors = loadAuthorList;

        message.eraseAlerts();
        loadAuthorList();

        function getSelectedFilter() {
            return $scope.authorFilter.selected;
        }

        function getAuthorList() {
            return $scope.authorList;
        }

        function getSearchParam() {
            var param = $scope.searchParam;
            if (param === "") {
                return "undefined";
            }
            return param;
        }

        function setAuthorList(newAuthorList) {
            $scope.authorList = newAuthorList;
        }

        function responseToAlert(alertType, details) {
            message.addAlert(alertType, details);
        }

        function loadAuthorList() {
            var request;
            var param = getSearchParam();
            var filter = getSelectedFilter();
            if (filter === "name") request = AuthorService.getAuthorsByName(param);
            else if (filter === "surname") request = AuthorService.getAuthorsBySurname(param);
            else request = AuthorService.getAuthors();
            request.then(function (response) {
                    setAuthorList(response.data);
                    //responseToAlert("success", "Authors loaded");
                },
                function (response) {
                    responseToAlert("danger", "Error while loading Authors")
                });
        }

        function uploadFile(author, file, okDetails) {
            fileUpload.uploadPortrait(file, author.id)
                .then(function (resp) {
                    responseToAlert("success", okDetails);
                    loadAuthorList();
                }, function (resp) {
                    responseToAlert("danger", "Failed to upload author picture");
                });
        }

        //Modify Modal
        $scope.openModifyModal = function (author) {
            if (author === undefined)
                author = {
                    name: '',
                    surname: '',
                    birthDate: new Date("April 1995")
                };
            var modalInstance = $uibModal.open({
                templateUrl: "static/views/fragment/add-author-modal.html",
                controller: "AddAuthorCtrl",
                resolve: {
                    author: function () {
                        return angular.copy(author);
                    }
                }
            });

            modalInstance.result.then(function (upload) {
                var badDetails, okDetails;
                var author = upload.author;
                var file = upload.file;
                if (author.id === undefined) {
                    badDetails = "Unable to add this Author";
                    okDetails = "Author added"
                }
                else {
                    badDetails = "Unable to modify this Author";
                    okDetails = "Author modified";
                }
                AuthorService.addAuthor(author)
                    .then(function (response) {
                            if (file === undefined) {
                                responseToAlert("success", okDetails);
                                loadAuthorList();
                            } else {
                                var authorAdded = response.data;
                                uploadFile(authorAdded, file, okDetails);
                            }
                        },
                        function (response) {
                            responseToAlert("danger", badDetails);
                        });
            }, function () {
            });
        };

        //Delete Modal
        $scope.openDeleteModal = function (author) {
            var modalInstance = $uibModal.open({
                templateUrl: "static/views/fragment/delete-author-modal.html",
                controller: "DeleteAuthorCtrl",
                resolve: {
                    author: function () {
                        return author;
                    }
                }
            });

            modalInstance.result.then(function (author) {
                AuthorService.removeAuthorById(author.id)
                    .then(function (response) {
                            responseToAlert("success", "Author deleted");
                            loadAuthorList();
                        },
                        function (response) {
                            responseToAlert("danger", "Unable to delete this Author")
                        });
            }, function () {
            });
        };

        function uploadPainting(painting, file) {
            fileUpload.uploadPicture(file, painting.id)
                .then(function (resp) {
                    responseToAlert("success", "Painting uploaded")
                }, function (resp) {
                    responseToAlert("danger", "Failed to upload picture");
                });
        }

        //Modify Painting Modal
        $scope.openModifyPaintingModal = function (author) {
            var painting = {
                title: '',
                height: 0,
                width: 0,
                medium: '',
                year: 1990,
                author: author,
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
                var badDetails = "Unable to add this Painting";
                var okDetails = "Painting added";
                PaintingService.addPainting(painting)
                    .then(function (response) {
                            responseToAlert("success", okDetails);
                            if (file !== undefined) {
                                var addedPainting = response.data;
                                uploadPainting(addedPainting, file);
                            }
                        },
                        function (response) {
                            responseToAlert("danger", badDetails);
                        });
            }, function () {
            });
        };
    });