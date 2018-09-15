/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('FilterEditCtrl', FilterEditCtrl);

    /** @ngInject */
    function FilterEditCtrl($scope, $filter, $state, toastr, FiltersFactory, dataService) {
        var vm = this;

        vm.editItem = editItem;
        vm.goBack = goBack;
        vm.fillForm = fillForm;

        vm.formFilterSelected = {};

        vm.token = localStorage.getItem('token');
        vm.editObj = dataService.editID;
        vm.editObj === null ? $state.go("main.catalog.filters") : vm.fillForm();

        function fillForm() {
            vm.formName = vm.editObj.name;
        }

        function editItem() {
            var fd = new FormData();
            fd.append("id", vm.editObj.id);
            fd.append("remember_token", vm.token);
            fd.append("name", vm.formName);

            FiltersFactory.editItem(fd).then(function (res) {
                if (res) {
                    $state.go("main.catalog.filters");
                    toastr.info('Измененно')
                }
            });
        }

        function goBack() {
            $state.go("main.catalog.filters")
        }
    }

})();
