/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home', ['ui.select'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.home', {
                url: 'home/',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Основные',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    icon: 'ion-earth',
                    order: 200
                }
            })
            .state('main.home.topbox', {
                url: 'topbox/',
                templateUrl: 'app/pages/home/topbox/topbox.html',
                title: 'Баннер в шапке',
                controller: 'TopboxPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 0
                }
            })
            .state('main.home.slider', {
                url: 'slider/',
                templateUrl: 'app/pages/home/slider/slider.html',
                title: 'Слайдер',
                controller: 'SliderPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 1
                }
            })
            .state('main.home.sliderAdd', {
                url: 'slider/add',
                templateUrl: 'app/pages/home/slider/sliderAdd/sliderAdd.html',
                title: 'Добавить Слайд',
                controller: 'SliderAddCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })
            .state('main.home.sliderEdit', {
                url: 'slider/edit',
                templateUrl: 'app/pages/home/slider/sliderEdit/sliderEdit.html',
                title: 'Редактировать Слайд',
                controller: 'SliderEditCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: false,
                sidebarMeta: {
                    order: 0
                }
            })
            .state('main.home.showcase', {
                url: 'showcase/',
                templateUrl: 'app/pages/home/showcase/showcase.html',
                title: 'Категории на главной',
                controller: 'ShowcasePageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 2
                }
            })
            .state('main.home.news', {
                url: 'news/',
                templateUrl: 'app/pages/home/news/news.html',
                title: 'Новости',
                controller: 'NewsPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 3
                }
            })
            .state('main.home.seo', {
                url: 'seo/',
                templateUrl: 'app/pages/home/seo/seo.html',
                title: 'SEO на главной',
                controller: 'SeoPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 4
                }
            })
            .state('main.home.contacts', {
                url: 'contacts/',
                templateUrl: 'app/pages/home/contacts/contacts.html',
                title: 'Контакты',
                controller: 'ContactsPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 4
                }
            })
            .state('main.home.banner', {
                url: 'banner/',
                templateUrl: 'app/pages/home/banner/banner.html',
                title: 'Баннер',
                controller: 'BannerPageCtrl',
                controllerAs: 'vm',
                // permission: ['ADMIN'],
                visibility: true,
                sidebarMeta: {
                    order: 5
                }
            })
    }

})();
