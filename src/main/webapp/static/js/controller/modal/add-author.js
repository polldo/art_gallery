'use strict';

angular.module('artGallery')
    .controller('AddAuthorCtrl', function ($scope, $filter, $uibModalInstance, author) {

        $scope.author = author;
        if($scope.author.id === undefined)
            $scope.title = 'Insert new author';
        else {
            $scope.title = 'Update author ' + $scope.author.surname + $scope.author.name;
            $scope.newName = $scope.author.name;
            $scope.newSurname = $scope.author.surname;
            var birthDate = $scope.author.birthDate;
            $scope.newYear = parseInt($filter('date')(birthDate, "yyyy"), 10);
            $scope.newMonth = parseInt($filter('date')(birthDate, "MM"), 10);
        }

        $scope.ok = function () {
            $scope.author.name = $scope.newName;
            $scope.author.surname = $scope.newSurname;
            $scope.author.birthDate = new Date($scope.newYear + " " + $scope.newMonth);
            $uibModalInstance.close($scope.author);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });