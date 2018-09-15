(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('FiltersPageCtrl', FiltersPageCtrl);

    /** @ngInject */
    function FiltersPageCtrl($scope, $filter, $state, toastr, $uibModal, FiltersFactory, dataService) {
        var vm = this;

        vm.createPage = createPage;
        vm.editPage = editPage;
        vm.deleteItem = deleteItem;
        vm.updateList = updateList;
        vm.openDeleteModal = openDeleteModal;

        vm.token = localStorage.getItem('token');
        dataService.canAdd = true;
        vm.tableSize = 20;

        //test-data
        vm.itemList = [
            {id: 0, name: "test1"},
            {id: 0, name: "test2"}];
        vm._itemList = [
            {id: 0, name: "test1"},
            {id: 0, name: "test2"}
            ];
        //test-data

        FiltersFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.itemList = res;
                vm._itemList = res;
            }
        });

        function updateList() {
            FiltersFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.itemList = res;
                    vm._itemList = res;
                }
            });
        }

        function createPage() {
            $state.go('main.catalog.filterAdd')
        }

        function editPage(id) {
            dataService.editID = id;
            $state.go('main.catalog.filterEdit')
        }

        function openDeleteModal(page, size, id) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size
            }).result.then(function () {
                vm.deleteItem(id);
            });
        }

        function deleteItem(id) {
            var fd = new FormData();
            fd.append("id", id);
            fd.append("remember_token", vm.token);
            FiltersFactory.deleteItem(fd).then(function (res) {
                if (res.result === 'done') {
                    vm.updateList();
                    toastr.error('Удалено')
                }
            });
        }
    }
})();
