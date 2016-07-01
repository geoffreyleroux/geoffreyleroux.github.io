'use strict';
angular.module('service.dialog', [])
    .factory('dialog', function($mdDialog) {
        return {
            confirm: function(text) {
                alert = $mdDialog.alert({
                    title: 'Thank you !',
                    textContent: text,
                    ok: 'Close'
                });
                $mdDialog.show(alert).finally(function() {
                    alert = undefined;
                });
            }
        }
    });
