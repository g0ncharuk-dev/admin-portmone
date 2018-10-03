(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('ContactsPageCtrl', ContactsPageCtrl);

    /** @ngInject */
    function ContactsPageCtrl($scope, $filter, $state, toastr, ContactsFactory) {
        var vm = this;

        vm.editItem = editItem;
        vm.updateList = updateList;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');

        function fillForm() {
            vm.formPhone1 = vm.itemList.phone_1;
            vm.formPhone2 = vm.itemList.phone_2;
            vm.formEmail1 = vm.itemList.email_1;
            vm.formEmail2 = vm.itemList.email_2;
            vm.formAddress = vm.itemList.address;
            vm.formLink1 = vm.itemList.vk_link;
            vm.formLink2 = vm.itemList.facebook_link;
        }

        ContactsFactory.getItem(vm.token).then(function (res) {
            if (res) {
                vm.itemList = res[0];
                vm.fillForm();
            }
        }, function () {
            toastr.error('Неудача!');
            baProgressModal.close();
        });

        function updateList() {
            ContactsFactory.getItem(vm.token).then(function (res) {
                if (res) {
                    vm.itemList = res;
                    vm.fillForm();
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            fd.append("phone_1", vm.formPhone1);
            fd.append("phone_2", vm.formPhone2);
            fd.append("email_1", vm.formEmail1);
            fd.append("email_2", vm.formEmail2);
            fd.append("address", vm.formAddress);
            fd.append("facebook_link", vm.formLink1);
            fd.append("vk_link", vm.formLink2);

            ContactsFactory.editItem(fd).then(function (res) {
                if (res) {
                    toastr.info('Изменено')
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }
    }
})();
