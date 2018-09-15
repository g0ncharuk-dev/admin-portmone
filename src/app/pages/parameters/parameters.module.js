/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.parameters', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.parameters', {
                url: 'parameters/',
                templateUrl: 'app/pages/parameters/parameters.html',
                controller: 'ParametersPageCtrl',
                controllerAs: 'vm',
                title: 'Параметры',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    icon: 'ion-gear-a',
                    order: 500
                }
            })
    }

})();
