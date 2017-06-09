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
                templateUrl: 'static/views/painting.html',
                controller: 'PaintingCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant('config', {
        path: 'http://localhost:8080/artgallery'
    })
;
