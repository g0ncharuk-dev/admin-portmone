(function () {
    'use strict';

    angular.module('BlurAdmin.pages.order')
        .controller('OrderPageCtrl', OrderPageCtrl);


    /** @ngInject */
    function OrderPageCtrl($scope, $filter, $state, toastr, $uibModal,
        OrderFactory, baProgressModal, dataService) {
        var vm = this;

        vm.editPage = editPage;
        vm.deleteItem = deleteItem;
        vm.updateList = updateList;
        vm.openDeleteModal = openDeleteModal;

        vm.token = localStorage.getItem('token');
        dataService.canAdd = true;
        vm.tableSize = 20;

        //temp
        // vm.itemList = [
        //     {
        //         id: 1,
        //         state: "new",
        //         address: "Івана Франка 16",
        //         calltype: "По телефону получателя (Звонок).",
        //         city: "Одесса",
        //         comment: "",
        //         delivery: "Новая Почта. Доставка насклад.",
        //         email: "a.v.honcharuk@gmail.com",
        //         name: "Andrey Hohcharuk",
        //         payment: "Перевод на карточку Приват Банка.",
        //         phone: "+38 (123) 123-12-31",
        //         products: [
        //             { id: 2739, name: "Hewlett-Packard EliteBook 2570P 12.5in i5 2.5GHz 4GB 250GB Win10Pro64 Webcam" },
        //             { id: 0, name: "кошелек Toryburch 164 кошелек Toryburch 164", price: 795, quantity: "2" }
        //         ],
        //         totalPrice: "4170",
        //         totalQuantity: "8"
        //     },
        //     {
        //         id: 2,
        //         state: "done",
        //         address: "Івана Франка 16",
        //         calltype: "По телефону получателя (Звонок).",
        //         city: "Одесса",
        //         comment: "",
        //         delivery: "Новая Почта. Доставка насклад.",
        //         email: "a.v.honcharuk@gmail.com",
        //         name: "Andrey Hohcharuk",
        //         payment: "Перевод на карточку Приват Банка.",
        //         phone: "+38 (123) 123-12-31",
        //         products: [
        //             { id: 2739, name: "Hewlett-Packard EliteBook 2570P 12.5in i5 2.5GHz 4GB 250GB Win10Pro64 Webcam" },
        //             { id: 0, name: "кошелек Toryburch 164 кошелек Toryburch 164", price: 795, quantity: "2" }
        //         ],
        //         totalPrice: "4170",
        //         totalQuantity: "8"
        //     },
        //     {
        //         id: 3,
        //         state: "canceled",
        //         address: "Івана Франка 16",
        //         calltype: "По телефону получателя (Звонок).",
        //         city: "Одесса",
        //         comment: "",
        //         delivery: "Новая Почта. Доставка насклад.",
        //         email: "a.v.honcharuk@gmail.com",
        //         name: "Andrey Hohcharuk",
        //         payment: "Перевод на карточку Приват Банка.",
        //         phone: "+38 (123) 123-12-31",
        //         products: [
        //             { id: 2739, name: "Hewlett-Packard EliteBook 2570P 12.5in i5 2.5GHz 4GB 250GB Win10Pro64 Webcam" },
        //             { id: 0, name: "кошелек Toryburch 164 кошелек Toryburch 164", price: 795, quantity: "2" }
        //         ],
        //         totalPrice: "4170",
        //         totalQuantity: "8"
        //     }
        // ];
        // vm._itemList = [
        //     {
        //         id: 1,
        //         state: "new",
        //         address: "Івана Франка 16",
        //         calltype: "По телефону получателя (Звонок).",
        //         city: "Одесса",
        //         comment: "",
        //         delivery: "Новая Почта. Доставка насклад.",
        //         email: "a.v.honcharuk@gmail.com",
        //         name: "Andrey Hohcharuk",
        //         payment: "Перевод на карточку Приват Банка.",
        //         phone: "+38 (123) 123-12-31",
        //         products: [
        //             { id: 2739, name: "Hewlett-Packard EliteBook 2570P 12.5in i5 2.5GHz 4GB 250GB Win10Pro64 Webcam" },
        //             { id: 0, name: "кошелек Toryburch 164 кошелек Toryburch 164", price: 795, quantity: "2" }
        //         ],
        //         totalPrice: "4170",
        //         totalQuantity: "8"
        //     },
        //     {
        //         id: 2,
        //         state: "done",
        //         address: "Івана Франка 16",
        //         calltype: "По телефону получателя (Звонок).",
        //         city: "Одесса",
        //         comment: "",
        //         delivery: "Новая Почта. Доставка насклад.",
        //         email: "a.v.honcharuk@gmail.com",
        //         name: "Andrey Hohcharuk",
        //         payment: "Перевод на карточку Приват Банка.",
        //         phone: "+38 (123) 123-12-31",
        //         products: [
        //             { id: 2739, name: "Hewlett-Packard EliteBook 2570P 12.5in i5 2.5GHz 4GB 250GB Win10Pro64 Webcam" },
        //             { id: 0, name: "кошелек Toryburch 164 кошелек Toryburch 164", price: 795, quantity: "2" }
        //         ],
        //         totalPrice: "4170",
        //         totalQuantity: "8"
        //     },
        //     {
        //         id: 3,
        //         state: "canceled",
        //         address: "Івана Франка 16",
        //         calltype: "По телефону получателя (Звонок).",
        //         city: "Одесса",
        //         comment: "",
        //         delivery: "Новая Почта. Доставка насклад.",
        //         email: "a.v.honcharuk@gmail.com",
        //         name: "Andrey Hohcharuk",
        //         payment: "Перевод на карточку Приват Банка.",
        //         phone: "+38 (123) 123-12-31",
        //         products: [
        //             { id: 2739, name: "Hewlett-Packard EliteBook 2570P 12.5in i5 2.5GHz 4GB 250GB Win10Pro64 Webcam" },
        //             { id: 0, name: "кошелек Toryburch 164 кошелек Toryburch 164", price: 795, quantity: "2" }
        //         ],
        //         totalPrice: "4170",
        //         totalQuantity: "8"
        //     }
        // ];
        //temp

        OrderFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.itemList = res;
                vm._itemList = res;
            }
        }, function () {
            baProgressModal.close();
            toastr.error('Неудачно!')
        });

        function updateList() {
            OrderFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.itemList = res;
                    vm._itemList = res;
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')
            });
        }

        function editPage(id) {
            dataService.editID = id;
            $state.go('main.orderEdit')
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
            OrderFactory.deleteItem(fd).then(function (res) {
                if (res) {
                    vm.updateList();
                    toastr.error('Удалено');
                    baProgressModal.close();
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')

            });
        }
    }
})();
