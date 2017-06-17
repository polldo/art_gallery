'use strict';

angular.module('artGallery')
    .controller('AddAuthorCtrl', function ($scope, $filter, $uibModalInstance, author) {
    	$scope.errName = undefined;
    	$scope.errSurname = undefined;
    	$scope.errYear = undefined;
    	$scope.errMonth = undefined;
    	$scope.errDYear = undefined;
    	$scope.errDMonth = undefined;

        $scope.author = author;
        if($scope.author.id === undefined)
            $scope.title = 'Insert new author';
        else {
            $scope.title = 'Update author ' + $scope.author.surname + $scope.author.name;
            $scope.newName = $scope.author.name;
            $scope.newSurname = $scope.author.surname;
            var birthDate = $scope.author.birthDate;
            $scope.newYear = $filter('date')(birthDate, "yyyy");
            $scope.newMonth = $filter('date')(birthDate, "MM");
            var deathDate = $scope.author.deathDate;
            if(deathDate !== undefined && deathDate !== null) {
                $scope.newDYear = $filter('date')(deathDate, "yyyy");
                $scope.newDMonth = $filter('date')(deathDate, "MM");
            }
            else {
            	$scope.newDYear = undefined;
                $scope.newDMonth = undefined;
            }
            $scope.newBiography = $scope.author.biography;
        }

        $scope.getPortraitSource = function () {
            if (author.id !== undefined)
                return "/artgallery/portraits/id/" + author.id;
            return "/artgallery/static/images/default-profile.jpg";
        };

        function validate () {
        	$scope.errName = undefined;
        	$scope.errSurname = undefined;
        	$scope.errYear = undefined;
        	$scope.errMonth = undefined;
        	$scope.errDYear = undefined;
        	$scope.errDMonth = undefined;
        	var valid = true;
        	if ($scope.newName === undefined || $scope.newName === "") {
        		$scope.errName = "Name is required";
        		valid = false;
        	}
        	if ($scope.newSurname === undefined || $scope.newSurname === "") {
        		$scope.errSurname = "Surname is required";
        		valid = false;
        	}
        	if ($scope.newYear === undefined || $scope.newYear === "") {
        		$scope.errYear = "Birth year is required";
        		valid = false;
        	}
        	else {
        		var year = parseInt($scope.newYear);
        		if (isNaN(year) || year < 0 || year > new Date().getFullYear()) {
        			$scope.errYear = "Invalid year (accepted values: 0-" + new Date().getFullYear() + ")";
        			valid = false;
        		}
        	}
        	if ($scope.newMonth === undefined || $scope.newMonth === "") {
        		$scope.errMonth = "Birth month is required";
        		valid = false;
        	}
        	else {
        		var month = parseInt($scope.newMonth);
        		if (isNaN(month) || month < 1 || month > 12) {
        			$scope.errMonth = "Invalid month (accepted values: 1-12)";
        			valid = false;
        		}
        	}
        	if ($scope.newDYear !== undefined && $scope.newDYear != "") {
        		var year = parseInt($scope.newDYear);
        		if (isNaN(year) || year < 0 || year > new Date().getFullYear()) {
        			$scope.errDYear = "Invalid year (accepted values: 0-" + new Date().getFullYear() + ")";
        			valid = false;
        		}
        	}
        	if ($scope.newDMonth !== undefined && $scope.newDMonth !== "") {
        		var month = parseInt($scope.newDMonth);
        		if (isNaN(month) || month < 1 || month > 12) {
        			$scope.errDMonth = "Invalid month (accepted values: 1-12)";
        			valid = false;
        		}
        	}
        	return valid;
        }
        
        $scope.ok = function () {
        	if(validate()) {
        		$scope.author.name = $scope.newName;
        		$scope.author.surname = $scope.newSurname;
        		$scope.author.birthDate = new Date(parseInt($scope.newYear),parseInt($scope.newMonth)-1);
        		if($scope.newDYear !== undefined && $scope.newDYear !== "" && $scope.newDMonth !== undefined && $scope.newDmonth !== "")
        			$scope.author.deathDate = new Date(parseInt($scope.newDYear), parseInt($scope.newDMonth)-1);
            	if($scope.newBiography !== null && $scope.newBiography !== "")
                	$scope.author.biography = $scope.newBiography;
            	var upload = {
            		author: $scope.author,
                	file: $scope.newFile
            	};
            	$uibModalInstance.close(upload);
        	}
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });