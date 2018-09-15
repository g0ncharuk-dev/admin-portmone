/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog', ['ui.select'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.catalog', {
                url: 'catalog/',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Каталог',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    icon: 'ion-bag',
                    order: 300
                }
            })

            .state('main.catalog.product', {
                url: 'product/',
                templateUrl: 'app/pages/catalog/product/product.html',
                title: 'Товары',
                controller: 'ProductPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 0
                }
            })
            .state('main.catalog.productAdd', {
                url: 'product/add',
                templateUrl: 'app/pages/catalog/product/productAdd/productAdd.html',
                title: 'Добавить Товар',
                controller: 'ProductAddCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })
            .state('main.catalog.productEdit', {
                url: 'product/edit',
                templateUrl: 'app/pages/catalog/product/productEdit/productEdit.html',
                title: 'Редактировать Товар',
                controllerAs: 'vm',
                controller: 'ProductEditCtrl',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })

            .state('main.catalog.category', {
                url: 'category/',
                templateUrl: 'app/pages/catalog/category/category.html',
                title: 'Категории',
                controller: 'CategoryPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 100
                }
            })
            .state('main.catalog.categoryAdd', {
                url: 'category/add',
                templateUrl: 'app/pages/catalog/category/categoryAdd/categoryAdd.html',
                title: 'Создать Категорию',
                controller: 'CategoryAddCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })
            .state('main.catalog.categoryEdit', {
                url: 'category/edit',
                templateUrl: 'app/pages/catalog/category/categoryEdit/categoryEdit.html',
                title: 'Редактировать Категорию',
                controller: 'CategoryEditCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })

            .state('main.catalog.filters', {
                url: 'filters/',
                templateUrl: 'app/pages/catalog/filters/filters.html',
                title: 'Фильтры',
                controller: 'FiltersPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 200
                }
            })
            .state('main.catalog.filterAdd', {
                url: 'filters/add',
                templateUrl: 'app/pages/catalog/filters/filterAdd/filterAdd.html',
                title: 'Создать Фильтр',
                controller: 'FilterAddCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })
            .state('main.catalog.filterEdit', {
                url: 'filters/edit',
                templateUrl: 'app/pages/catalog/filters/filterEdit/filterEdit.html',
                title: 'Редактировать Фильтр',
                controller: 'FilterEditCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })


    }

})();
