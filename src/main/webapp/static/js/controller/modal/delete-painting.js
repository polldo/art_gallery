'use strict';

angular.module('artGallery')
    .controller('DeletePaintingCtrl', function ($scope, $uibModalInstance, painting) {

        $scope.painting = painting;
        $scope.ok = function () {
            $uibModalInstance.close($scope.painting);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
