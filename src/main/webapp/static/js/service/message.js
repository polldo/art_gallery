'use strict';

angular.module('artGallery')
    .service('message', function () {

        this.alerts = [];

        this.addAlert = function(type, message){
            if(this.alerts.length === 1)
                this.alerts = [];
            this.alerts.push({
                type: type,
                message: message
            })
        };

        this.removeAlert = function(index){
            this.alerts.splice(index, 1);
        };

        this.eraseAlerts = function(){
            this.alerts = [];
        };

    });
