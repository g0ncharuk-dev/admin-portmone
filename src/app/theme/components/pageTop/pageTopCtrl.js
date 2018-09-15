/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $state, $uibModal) {
        var vm = this;


        vm.open = function (page, size) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            }).result.then(function () {
                vm.logout();
            });
        };


        vm.logout = function () {
            localStorage.removeItem('authenticated');
            $state.go('authorization');
        }
    }
})();