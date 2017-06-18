'use strict';

angular.module('artGallery')
    .controller('LoginCtrl', function ($scope, $filter, $uibModalInstance) {

        $scope.ok = function () {
            var credentials = {
                username: $scope.logUser,
                password: $scope.logPass
            }
        $uibModalInstance.close(credentials);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });