'use strict';

angular.module('artGallery')
    .controller('HomeCtrl', function ($scope) {
    	  var slides = $scope.slides = [];
    	  
        slides.push({
            image: "/artgallery/static/images/Paintings.png",
            onclick: "#!/painting",
            id: 0
          });
          slides.push({
              image: "/artgallery/static/images/authors.png",
              onclick: "#!/author",
              id: 1
          });
          slides.push({
              image: "/artgallery/static/images/openinghours.png",
              onclick: "",
              id: 2
          });
          slides.push({
              image: "/artgallery/static/images/wheretofindus.png",
              onclick: "",
              id: 3
          });         	
    	});