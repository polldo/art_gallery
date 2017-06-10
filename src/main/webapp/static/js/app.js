'use strict';


angular
    .module('artGallery', [
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'static/views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/author/', {
                templateUrl: 'static/views/author.html',
                controller: 'AuthorCtrl'
            })
            .when('/painting/', {
                templateUrl: 'static/views/painting_public.html',
                controller: 'PaintingCtrl'
            })
            .when('/painting2/', {
                templateUrl: 'static/views/painting.html',
                controller: 'PaintingCtrl'
            })
            .when('/picture/', {
                templateUrl: 'static/views/picture.html',
                controller: 'PictureCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant('config', {
        path: 'http://localhost:8080/artgallery'
    })
;
