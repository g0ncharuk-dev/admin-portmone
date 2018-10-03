/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.order')
        .controller('OrderEditCtrl', OrderEditCtrl);

    /** @ngInject */
    function OrderEditCtrl($scope, $filter, $state, toastr, OrderFactory, dataService) {
        var vm = this;

        vm.editItem = editItem;
        vm.goBack = goBack;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');
        vm.editObj = dataService.editID;
        vm.editObj === null ? $state.go("main.order") : vm.fillForm();

        function fillForm() {
            vm.formName = vm.editObj.name;
            vm.formState = vm.editObj.state === "done";
            vm.formStateErr = vm.editObj.state === "canceled";
            vm.formEmail = vm.editObj.email;
            vm.formPhone = vm.editObj.phone;
            vm.formMsg= vm.editObj.comment;
            vm.formCity = vm.editObj.city;
            vm.formAddress = vm.editObj.address;
            vm.formCalltype = vm.editObj.calltype;
            vm.formDelivery = vm.editObj.delivery;
            vm.formPayment = vm.editObj.payment;

            vm.formTotalPrice = Number(vm.editObj.totalPrice);
            vm.formTotalQuantity = Number(vm.editObj.totalQuantity);

            vm.products = vm.editObj.products
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("id", vm.editObj.id);
            fd.append("state", vm.formState ? "done" : vm.formStateErr ? "canceled": "new");
            fd.append("city", vm.formCity);
            fd.append("totalPrice", vm.formTotalPrice);
            fd.append("totalQuantity", vm.formTotalQuantity);
            OrderFactory.editItem(fd).then(function (res) {
                if (res) {
                    $state.go("main.order");
                    toastr.info('Измененно')
                }
            }, function () {
                baProgressModal.close();
                toastr.error('Неудачно!')
    
            });
        }

        function goBack() {
            $state.go("main.order")
        }

    }

})();
