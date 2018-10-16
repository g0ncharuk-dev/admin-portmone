/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('FilterAddCtrl', FilterAddCtrl);

    /** @ngInject */
    function FilterAddCtrl($scope, $filter, $state,toastr, FiltersFactory, dataService) {
        var vm = this;

        vm.createItem = createItem;
        vm.goBack = goBack;

        vm.canAdd = dataService.canAdd;
        vm.canAdd === null ? $state.go("main.catalog.filters") : void(0);

        vm.token = localStorage.getItem('token');

        function createItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("name", vm.formName);

            FiltersFactory.createItem(fd).then(function (res) {
                if (res) {
                    $state.go("main.catalog.filters");
                    toastr.success('Созданно')
                }
            });
        }

        function goBack() {
            $state.go("main.catalog.filters")
        }
    }
})();
