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
            var deathDate = $scope.author.deathDate;
            if(deathDate !== undefined) {
                $scope.newDYear = parseInt($filter('date')(deathDate, "yyyy"), 10);
                $scope.newDMonth = parseInt($filter('date')(deathDate, "MM"), 10);
            }
            $scope.newBiography = $scope.author.biography;
        }

        $scope.getPortraitSource = function () {
            if (author.id !== undefined)
                return "/artgallery/portraits/id/" + author.id;
            return "/artgallery/static/images/default-profile.jpg";
        };

        $scope.ok = function () {
            $scope.author.name = $scope.newName;
            $scope.author.surname = $scope.newSurname;
            $scope.author.birthDate = new Date($scope.newYear + " " + $scope.newMonth);
            if($scope.newDYear !== undefined && $scope.newDYear !== "")
                $scope.author.deathDate = new Date($scope.newDYear + " " + $scope.newDMonth);
            if($scope.newBiography !== null && $scope.newBiography !== "")
                $scope.author.biography = $scope.newBiography;
            var upload = {
                author: $scope.author,
                file: $scope.newFile
            };
            $uibModalInstance.close(upload);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });