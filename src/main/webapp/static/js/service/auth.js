'use strict';

angular.module('artGallery')
  .factory('auth', function ($window) {

    function getToken(){
      return $window.localStorage.getItem('token');
    }
    function removeToken(){
      $window.localStorage.removeItem('token');
    }

    return {

      getToken: getToken,

      saveToken: function(token){
        $window.localStorage.setItem('token', token);
      },

      removeAuthentication: function(){
        removeToken();
      },

      isAuth: function(){
        var token = getToken();
        return token != null;
      }

    };
  });
