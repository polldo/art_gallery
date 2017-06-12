'use strict';

angular.module('artGallery')
    .controller('AlertCtrl', function ($scope, $interval, message) {

        $scope.$watchCollection(function(){
            return message.alerts;
        }, function(newAlerts, oldAlerts) {
            $scope.alerts = newAlerts;
            $scope.clear();
        });

        $scope.closeAlert = function(index){
            message.removeAlert(index);
        };

        $scope.clear = function(){
            if (angular.isDefined($scope.timer)) {
                $interval.cancel($scope.timer);
            }
            $scope.timer = $interval(function(){
                message.eraseAlerts();
                $interval.cancel($scope.timer);
                $scope.timer = undefined;
            }, 6000)
        };

    });
