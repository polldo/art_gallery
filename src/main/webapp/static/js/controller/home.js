'use strict';

angular.module('artGallery')
    .controller('HomeCtrl', function ($scope, AuthorService) {
    		var authList = [];
    		var authorList = [];
            $scope.setCurrentAuthor = AuthorService.setCurrentAuthor;
    		$scope.authors = authorList;
    		loadAuthorList();
    		
    		function getRandomIndexes (top_limit) {
    			var a = [];
    			for (var i=0;i<3;i++)
    				a.push(Math.floor(Math.random() * top_limit));
    			return a;
    		}
    		
    		function getRandomAuthors()  {
    			var indexes = getRandomIndexes (authList.length);
    			for (var i=0; i<3; i++) {
    				var ind = indexes[i];
    				authorList.push({
    					author: authList[ind],
    					id: i
    				});
    			}
    		}
    		
    		function loadAuthorList() {
    			var request = AuthorService.getAuthors();
    			request.then(function (response) {
                     authList = response.data;
                     getRandomAuthors();
                 },
                 function () {
                 });
    		}
    	});