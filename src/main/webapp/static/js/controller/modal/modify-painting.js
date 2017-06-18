'use strict';

angular.module('artGallery')
    .controller('ModifyPaintingCtrl', function ($scope, $uibModalInstance, painting, AuthorService, RoomService) {
    	$scope.errTitle = undefined;
    	$scope.errHeight = undefined;
    	$scope.errWidth = undefined;
    	$scope.errMedium = undefined;
    	$scope.errYear = undefined;
    	$scope.errAuthor = undefined;
    	
        $scope.oldAuthor = painting.author;
        $scope.oldRoom = painting.room;

        $scope.hasAuthor = function () {
            return $scope.oldAuthor !== undefined;
        };
        $scope.hasRoom = function () {
            return $scope.oldRoom !== undefined;
        };
        $scope.getPaintingSource = function () {
            if (painting.id !== undefined)
                return "/artgallery/pictures/id/" + painting.id;
            return "/artgallery/static/images/default.png";
        };

        loadAuthors();
        loadRooms();
        initParams();

        function loadAuthors () {
            AuthorService.getAuthors().then(function (resp) {
                $scope.paintingAuthor = {
                    selected: undefined,
                    availableAuthors: resp.data
                };
            }, function () {
                $scope.title = "ERROR LOADING AUTHORS"
            });
        }

        function loadRooms () {
            RoomService.getRooms().then(function (resp) {
                $scope.paintingRoom = {
                    selected: undefined,
                    availableRooms: resp.data
                };
            }, function () {
                $scope.title = "ERROR LOADING ROOMS"
            });
        }

        function initParams () {
            $scope.painting = painting;
            if ($scope.painting.id === undefined)
                $scope.title = 'Insert new painting';
            else
                $scope.title = 'Update painting ' + $scope.painting.title;
            $scope.newTitle = $scope.painting.title;
            $scope.newHeight = $scope.painting.height;
            $scope.newWidth = $scope.painting.width;
            $scope.newMedium = $scope.painting.medium;
            $scope.newYear = $scope.painting.year;
        }

        function validate () {
        	$scope.errTitle = undefined;
        	$scope.errHeight = undefined;
        	$scope.errWidth = undefined;
        	$scope.errMedium = undefined;
        	$scope.errYear = undefined;
        	$scope.errAuthor = undefined;
        	var valid = true;
        	if ($scope.newTitle === undefined || $scope.newTitle === "") {
        		$scope.errTitle = "Title is required";
        		valid = false;
        	}
        	if ($scope.newHeight === undefined) {
        		$scope.errHeight = "Height is required";
        		valid = false;
        	}
        	else {
        		var height = parseInt($scope.newHeight);	
        		if (isNaN(height) || height <= 0) {
        		$scope.errHeight = "Invalid Height (must be a number > 0)";
        		valid = false;
        		}
        	}
        	if ($scope.newWidth === undefined) {
        		$scope.errWidth = "Width is required";
        		valid = false;
        	}
        	else {
        		var width = parseInt($scope.newWidth);	
        		if (isNaN(width) || width <= 0) {
        		$scope.errWidth = "Invalid Width (must be a number > 0)";
        		valid = false;
        		}
        	}
        	if ($scope.newMedium === undefined || $scope.newMedium === "") {
        		$scope.errMedium = "Medium is required";
        		valid = false;
        	}
        	if($scope.newYear === undefined) {
        		$scope.errYear = "Year is required";
    			valid = false;
        	}
        	else {
        		var year = parseInt($scope.newYear)
        		if(isNaN(year) || year < 0 || year > new Date().getFullYear()) {
        			$scope.errYear = "Invalid year (accepted values: 0-" + new Date().getFullYear() + ")";
        			valid = false;
        		}
        	}
        	if($scope.paintingAuthor.selected === undefined && $scope.oldAuthor === undefined) {
        		$scope.errAuthor = "An author must be selected";
        		valid = false;
        	}
        	return valid;
        }
        
        $scope.ok = function () {
        	if(validate()) {
        		$scope.painting.title = $scope.newTitle;
        		$scope.painting.height = $scope.newHeight;
        		$scope.painting.width = $scope.newWidth;
        		$scope.painting.medium = $scope.newMedium;
        		$scope.painting.year = $scope.newYear;
        		if ($scope.paintingAuthor.selected !== undefined)
        			$scope.painting.author = $scope.paintingAuthor.selected;
        		if ($scope.paintingRoom.selected !== undefined)
        			$scope.painting.room = $scope.paintingRoom.selected;
        		var upload = {
        				painting: $scope.painting,
        				file: $scope.newFile
        		};
        		$uibModalInstance.close(upload);
        	}       	
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });