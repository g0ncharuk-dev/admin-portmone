/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',

        'BlurAdmin.pages.main',
        'BlurAdmin.pages.authorization',

        'BlurAdmin.pages.catalog',
        'BlurAdmin.pages.home',
        'BlurAdmin.pages.review',
        'BlurAdmin.pages.order',
        'BlurAdmin.pages.parameters'


    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {

    }

})();
