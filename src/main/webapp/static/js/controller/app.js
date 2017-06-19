'use strict';

angular.module('artGallery')
    .controller('AppCtrl', function ($scope, $window, $http, $uibModal, auth, config) {

        var path = config.path;
        $scope.$watch(
          function(){ return auth.isAuth(); },
          function(newIsAuth, oldIsAuth){ $scope.isAuth = newIsAuth; }
          );

        $scope.logout = function(){
            auth.removeAuthentication();
            var url = $window.location.href;
            $window.location.href = '#!/home';
        }

        $scope.login = function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: "static/views/fragment/login-modal.html",
                        controller: "LoginCtrl",
                    });

                    modalInstance.result.then(function (credentials) {
                        var username = credentials.username;
                        var password = credentials.password;
                        $scope.encoded = btoa(username + ":" + password);
                        var req = {
                                    method: 'POST',
                                    url: path + "/oauth/token?grant_type=client_credentials",
                                    headers: {
                                        "Authorization": "Basic " + $scope.encoded
                                    },
                                }
                                $http(req).then(function(){alert("Login succeeded!")}, function() {});
                    }, function () {
                    });
                };
    });
