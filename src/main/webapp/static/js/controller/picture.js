'use strict';

angular.module('artGallery')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .service('fileUpload', ['$http', 'config', function ($http, config) {
        this.uploadFileToUrl = function (file, imageId) {
            var uploadUrl = config.path + '/pictures/id/' + imageId;
            var fd = new FormData();
            fd.append('file', file);
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }
    }])
    .controller('PictureCtrl', function ($scope, fileUpload) {
        $scope.uploadFile = function () {
            var file = $scope.myFile;
            fileUpload.uploadFileToUrl(file, $scope.imageId)
                .then(function () {
                }, function () {
                });

        }
    });