/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authorization', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('authorization', {
                url: 'authorization',
                templateUrl: 'app/pages/authorization/authorization.html',
                title: '-',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    icon: 'ion-speedometer',
                    order: 0
                }
            });
    }

})();
