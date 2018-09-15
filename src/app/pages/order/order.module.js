/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.order', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.order', {
                url: 'order/',
                templateUrl: 'app/pages/order/order.html',
                controller: 'OrderPageCtrl',
                controllerAs: 'vm',
                title: 'Заказы',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    icon: 'ion-cube',
                    order: 100
                }
            })

            .state('main.orderEdit', {
                url: 'order/edit',
                templateUrl: 'app/pages/order/orderEdit/orderEdit.html',
                title: 'Просмотреть заказ',
                controller: 'OrderEditCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })
    }

})();
