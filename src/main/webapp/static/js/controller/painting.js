'use strict';

angular.module('artGallery')
    .controller('PaintingCtrl', function ($scope, PaintingService, $uibModal) {
    	$scope.openIndex = undefined;
        $scope.paintingList = undefined;
        $scope.paintingFilter = {
            selected: "no filter",
            availableFilters: ["no filter", "title", "medium", "year"]
        };
        $scope.searchParam = "";
        $scope.searchPaintings = loadPaintingList;
        $scope.setIndex = setOpenIndex;

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
        }

        function badResponse(response) {
            //here a boolean var has to be changed
        }

        function setOpenIndex(index) {
        	if (index === $scope.openIndex) $scope.openIndex = undefined;
        	else $scope.openIndex = index;
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
        	 modalInstance.result.then(function () {}, function (response) {badResponse(response)});
        	 }      	

    });
