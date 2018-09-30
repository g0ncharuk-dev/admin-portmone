(function () {
    'use strict';

    angular.module('BlurAdmin.pages.review')
        .controller('ReviewPageCtrl', ReviewPageCtrl);


    /** @ngInject */
    function ReviewPageCtrl($scope, $filter, $state, toastr, $uibModal,
                            ReviewFactory, dataService) {
        var vm = this;

        vm.editPage = editPage;
        vm.deleteItem = deleteItem;
        vm.updateList = updateList;
        vm.openDeleteModal = openDeleteModal;

        vm.token = localStorage.getItem('token');
        dataService.canAdd = true;
        vm.tableSize = 20;

        //temp
        vm.itemList = [
            {
                id: 1,
                state: false,
                name: "Тест Тест",
                email: "test@test.ccc",
                phone: "+99 999 99 99 999",
                date: "2018-02-09 11:38:00",
                message: "Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест ",
                answer: {
                    name: "Тест Тест",
                    date: "2018-02-09 11:38:00",
                    message: ""
                }

            }, {
                id: 2,
                state:true,
                name: "Тест Тест",
                email: "test@test.ccc",
                phone: "+99 999 99 99 999",
                date: "2018-02-09 11:38:00",
                message: "Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест ",
                answer: {
                    name: "админ админ",
                    date: "2018-02-09 11:38:00",
                    message: "12312313"
                }
            }, {
                id: 2,
                state: true,
                name: "Тест Тест",
                email: "test@test.ccc",
                phone: "+99 999 99 99 999",
                date: "2018-02-09 11:38:00",
                message: "Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест Тест"
            }
        ];
        vm._itemList = vm.itemList;
        //temp

        ReviewFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.itemList = res;
                vm._itemList = res;
            }
        });

        function updateList() {
            ReviewFactory.getList(vm.token).then(function (res) {
                if (res.status === 'success') {
                    vm.itemList = res.data;
                    vm._itemList = res.data;
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
            var data = {
                id: id,
                token: vm.token
            };
            ReviewFactory.deleteItem(JSON.stringify(data)).then(function (res) {
                if (res.status === 'success') {
                    vm.updateList();
                    toastr.error('Удалено', {
                        "autoDismiss": false,
                        "positionClass": "toast-bottom-right",
                        "type": "info",
                        "timeOut": "3000",
                        "extendedTimeOut": "1000",
                        "allowHtml": false,
                        "closeButton": false,
                        "tapToDismiss": true,
                        "progressBar": false,
                        "newestOnTop": true,
                        "maxOpened": 0,
                        "preventDuplicates": false,
                        "preventOpenDuplicates": false
                    })
                }
            });
        }
    }
})();
