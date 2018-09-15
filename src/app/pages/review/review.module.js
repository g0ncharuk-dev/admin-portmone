/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.review', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.review', {
                url: 'review/',
                templateUrl: 'app/pages/review/review.html',
                controller: 'ReviewPageCtrl',
                controllerAs: 'vm',
                title: 'Отзывы',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    icon: 'ion-chatbubble',
                    order: 400
                }
            })

            .state('main.reviewEdit', {
                url: 'review/edit',
                templateUrl: 'app/pages/review/reviewEdit/reviewEdit.html',
                title: 'Редактировать',
                controller: 'ReviewEditCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })

    }

})();
