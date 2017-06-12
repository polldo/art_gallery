'use strict';

angular.module('artGallery')
    .controller('DeleteAuthorCtrl', function ($scope, $uibModalInstance, author) {

        $scope.author = author;
        $scope.ok = function () {
            $uibModalInstance.close($scope.author);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
