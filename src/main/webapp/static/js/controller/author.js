'use strict';

angular.module('artGallery')
    .controller('AuthorCtrl', function ($scope, $uibModal, AuthorService, PaintingService, message) {

        $scope.authorList = undefined;
        $scope.filter = 'none';
        $scope.searchParam = "";
        $scope.searchAuthors = loadAuthorList;
        $scope.setCurrentAuthor = AuthorService.setCurrentAuthor;

        message.eraseAlerts();
        loadAuthorList();

        function getSelectedFilter() {
            return $scope.filter;
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

    });