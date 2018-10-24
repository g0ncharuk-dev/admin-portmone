(function () {
    'use strict';

    angular.module('BlurAdmin.pages.review')
        .controller('ReviewPageCtrl', ReviewPageCtrl);


    /** @ngInject */
    function ReviewPageCtrl($scope, $filter, $state, toastr, $uibModal,
                            ReviewFactory, dataService,baProgressModal) {
        var vm = this;

        vm.editPage = editPage;
        vm.deleteItem = deleteItem;
        vm.updateList = updateList;
        vm.openDeleteModal = openDeleteModal;

        vm.token = localStorage.getItem('token');
        dataService.canAdd = true;
        vm.tableSize = 20;

        ReviewFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.itemList = res;
                vm._itemList = res;
            }
        });

        function updateList() {
            ReviewFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.itemList = res;
                    vm._itemList = res;
                }
            });
        }

        function editPage(id) {
            dataService.editID = id;
            $state.go('main.reviewEdit')
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
            ReviewFactory.deleteItem(fd).then(function (res) {
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
