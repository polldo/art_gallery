'use strict';

angular.module('artGallery')
    .controller('PaintingCtrl', function ($scope, $uibModal, PaintingService, AuthorService, message) {

        $scope.currentAuthor = AuthorService.getCurrentAuthor();
        AuthorService.setCurrentAuthor(undefined);
        $scope.paintingIndex = undefined;
        $scope.paintingList = undefined;
        $scope.filter = "none";
        $scope.searchParam = "";
        $scope.searchPaintings = loadPaintingList;
        $scope.setIndex = setPaintingIndex;

        message.eraseAlerts();
        initAuthorsSelect();
        loadPaintingList();
        loadAuthors();

        function getSelectedFilter() {
            return $scope.filter;
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
        }

        function badResponse(response) {
            //here a boolean var has to be changed
            message.addAlert("danger", "Unable to load the Paintings with this filter");
            setPaintingList([]);
        }

        function setPaintingIndex(index) {
            if (index === $scope.paintingIndex) $scope.paintingIndex = undefined;
            else $scope.paintingIndex = index;
        }

        function initAuthorsSelect() {
            if ($scope.currentAuthor !== undefined) {
                var author = $scope.currentAuthor;
                $scope.paintingAuthor = {
                    selected: author,
                    availableAuthors: [author]
                };
                $scope.filter = "author";
            }
        }

        function loadAuthors() {
            AuthorService.getAuthors().then(function (resp) {
                if ($scope.currentAuthor === undefined)
                    $scope.paintingAuthor = {
                        selected: undefined,
                        availableAuthors: resp.data
                    };
                else {
                    var data = resp.data;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id !== $scope.currentAuthor.id)
                            $scope.paintingAuthor.availableAuthors.push(data[i]);
                    }
                }
            }, function () {
                $scope.title = "ERROR LOADING AUTHORS"
            });
        }

        function loadPaintingList() {
            var request;
            var param = getSearchParam();
            var filter = getSelectedFilter();
            if (filter === "title")
                request = PaintingService.getPaintingsByTitle(param);
            else if (filter === "medium")
                request = PaintingService.getPaintingsByMedium(param);
            else if (filter === "year")
                request = PaintingService.getPaintingsByYear(param);
            else if (filter === "author") {
                var author = $scope.paintingAuthor.selected;
                if (author === undefined)
                    author = {id: 0};
                request = PaintingService.getPaintingsByAuthor(author);
            }
            else
                request = PaintingService.getPaintings();
            request.then(okResponse, badResponse);
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
