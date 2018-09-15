/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.main', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/pages/main/main.html',
                // permission: ['ADMIN'],
                visibility: false
            });
    }

})();
