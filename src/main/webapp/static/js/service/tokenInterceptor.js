'use strict';

angular.module('artGallery')
  .factory('tokenInterceptor', function ($q, $window, auth, config) {

    var path = config.path;
    var pathSecured = config.pathSecured;

    return {
      'request': function(conf) {
        var token = auth.getToken();
        if(conf.url.indexOf(path) === 0 && token !== undefined && token !== null) {
          conf.headers.Authorization = 'Bearer ' + token;
        }
        return conf;
      },

      'response': function(response) {
        if(response.config.url.indexOf(path) === 0 && response.data['access_token'] && response.data['access_token'] !== null) {
          auth.saveToken(response.data['access_token']);
        }
        return response;
      },

      'responseError': function (rejection) {
        if (rejection.status === 401) {
          auth.removeAuthentication();
          $window.location.href = '#!/home';
          alert("You have no permissions!")
        }
        return $q.reject(rejection);
      }
    };
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
  });
