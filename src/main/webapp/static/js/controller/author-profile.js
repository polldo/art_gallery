'use strict';

angular.module('artGallery')
    .controller('AuthorProfileCtrl', function ($scope, $location, AuthorService, PaintingService) {
        $scope.dio = "cane";
        $scope.author = AuthorService.getCurrentAuthor();
        AuthorService.setCurrentAuthor(undefined);
        if($scope.author === undefined)
            $location.url('/author/');

        PaintingService.getPaintingsByAuthor($scope.author).then(
        function (resp) {
            resp.data.splice(4);
            $scope.fivePaintingList = resp.data;
        });

    });