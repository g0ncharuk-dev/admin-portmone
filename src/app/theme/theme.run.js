/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .run(themeRun);

    /** @ngInject */
    function themeRun($timeout, $window, $rootScope, $state, layoutPaths, preloader, $q,
                      PermRoleStore, PermPermissionStore, $http, $urlRouter, baSidebarService) {

        PermPermissionStore
            .definePermission('authorized', function () {
                if (JSON.parse(localStorage.getItem('authenticated'))) {
                    return true;
                } else {
                    $state.go('authorization');
                    return false;
                }
            });

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var authorized = JSON.parse(localStorage.getItem('authenticated'));
            if (authorized) {
                if (toState.name === "authorization") {
                    event.preventDefault();
                    $state.go('main.order');
                    return true;
                }
            } else {
                if ($state.is('authorization')) {
                    return false;
                } else {
                    if (toState.name !== "authorization") {
                        event.preventDefault();
                        $state.go('authorization');
                        return true;
                    }
                }
            }
        });

        var whatToWait = [
            preloader.loadAmCharts(),
            $timeout(3000)
        ];

        $q.all(whatToWait).then(function () {
            $rootScope.$pageFinishedLoading = true;
        });

        $timeout(function () {
            if (!$rootScope.$pageFinishedLoading) {
                $rootScope.$pageFinishedLoading = true;
            }
        }, 7000);

        $rootScope.$baSidebarService = baSidebarService;
    }

})();