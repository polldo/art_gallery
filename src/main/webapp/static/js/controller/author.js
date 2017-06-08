'use strict';

angular.module('artGallery')
    .controller('AuthorCtrl', function ($scope, AuthorService) {

        $scope.authorList = undefined;
        $scope.authorFilter = {
            selected: "no filter",
            availableFilters: ["no filter", "name", "surname"]
        };
        $scope.searchParam = undefined;
        $scope.searchAuthors = loadAuthorList;

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
        }

        function badResponse(response) {
            //here a boolean var has to be changed
        }

        function loadAuthorList() {
            var request;
            var param = getSearchParam();
            var filter = getSelectedFilter();
            if (filter === "name") request = AuthorService.getAuthorsByName(param);
            else if (filter === "surname") request = AuthorService.getAuthorsBySurname(param);
            else request = AuthorService.getAuthors();
            request.then(okResponse, badResponse);
        }

    });
