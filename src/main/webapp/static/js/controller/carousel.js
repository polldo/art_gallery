'use strict';

angular.module('artGallery')
    .controller('CarouselCtrl', function ($scope) {
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
          slides.push({
              image: "/artgallery/static/images/project-info.png",
              onclick: "#!/info",
              id: 4
          }); 
    	});