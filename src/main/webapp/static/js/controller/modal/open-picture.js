'use strict';

angular.module('artGallery')
    .controller('OpenPictureCtrl', function ($scope, $uibModalInstance, id_picture) {
    	$scope.id_picture = id_picture;
    	
        $scope.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });