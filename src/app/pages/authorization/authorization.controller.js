/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authorization')
        .controller('AuthorizationPageCtrl', AuthorizationPageCtrl);

    /** @ngInject */
    function AuthorizationPageCtrl($scope,$state, $http, Config) {

        var vm = this;

        vm.hasError = false;

        vm.login = function () {
            $http({
                method: 'POST',
                url: Config.login,
                data: {email: vm.authLogin, password: vm.authPassword}
            }).then(function (response) {
                vm.hasError = false;
                localStorage.setItem('token', response.data);
                // localStorage.setItem('token', response.data.body.token);
                localStorage.setItem('authenticated', true);
                $state.go('main.order');
            }, function (error) {
                vm.hasError = true;
                console.error(error.data.errors);
            })
        }
    }


})();
