'use strict';

angular.module('artGallery')
    .controller('AuthorCtrl', function ($scope, $uibModal, AuthorService, message) {

        $scope.authorList = undefined;
        $scope.authorFilter = {
            selected: "no filter",
            availableFilters: ["no filter", "name", "surname"]
        };
        $scope.searchParam = undefined;
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
            return $scope.searchParam;
        }

        function setAuthorList(newAuthorList) {
            $scope.authorList = newAuthorList;
        }

        function okResponse(response) {
            setAuthorList(response.data);
            message.eraseAlerts();
        }

        function badResponse(response, details) {
            //here a boolean var has to be changed
            message.addAlert("danger", details);
        }

        function loadAuthorList() {
            var request;
            var param = getSearchParam();
            var filter = getSelectedFilter();
            if (filter === "name") request = AuthorService.getAuthorsByName(param);
            else if (filter === "surname") request = AuthorService.getAuthorsBySurname(param);
            else request = AuthorService.getAuthors();
            request.then(okResponse,
                function (response) {
                    badResponse(response, "Error while loading Authors")
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

            modalInstance.result.then(function (author) {
                var details;
                if (author.id === undefined)
                    details = "Unable to add this Author";
                else
                    details = "Unable to modify this Author";
                AuthorService.addAuthor(author)
                    .then(loadAuthorList,
                        function (response) {
                            badResponse(response, details)
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
                    .then(loadAuthorList,
                        function (response) {
                            badResponse(response, "Unable to delete this Author")
                        });
            }, function () {
            });
        };
    });