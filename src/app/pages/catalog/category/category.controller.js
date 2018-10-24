(function () {
    'use strict';

    angular.module('BlurAdmin.pages.catalog')
        .controller('CategoryPageCtrl', CategoryPageCtrl);

    /** @ngInject */
    function CategoryPageCtrl($scope, $filter, $state, toastr, baProgressModal, $uibModal, CategoryFactory, dataService) {
        var vm = this;

        vm.createPage = createPage;
        vm.editPage = editPage;
        vm.deleteItem = deleteItem;
        vm.updateList = updateList;
        vm.openDeleteModal = openDeleteModal;

        vm.token = localStorage.getItem('token');
        dataService.canAdd = true;
        vm.tableSize = 20;
        baProgressModal.open();

        CategoryFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.itemList = res;
                vm._itemList = vm.itemList;
                baProgressModal.close();
            }
        }, function () {
            baProgressModal.close();
            toastr.error('Неудачно!')

        });

        function updateList() {
            baProgressModal.open();
            CategoryFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.itemList = res;
                    vm._itemList = vm.itemList;
                    baProgressModal.close();
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')

            });
        }

        function createPage() {
            $state.go('main.catalog.categoryAdd')
        }

        function editPage(id) {
            dataService.editID = id;
            $state.go('main.catalog.categoryEdit')
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

            baProgressModal.open();
            CategoryFactory.deleteItem(fd).then(function (res) {
                if (res.data == null) {
                    vm.updateList();
                    baProgressModal.close();
                    toastr.error('Удалено')
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')

            });
        }
    }
})();
