(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('BannerPageCtrl', BannerPageCtrl);

    /** @ngInject */
    function BannerPageCtrl($scope, $filter, $state, toastr, BannerFactory) {
        var vm = this;

        vm.editItem = editItem;
        vm.updateList = updateList;
        vm.fillForm = fillForm;

        vm.token = localStorage.getItem('token');
        //temp
        vm.itemList = {image: ["https://portmonetka.com.ua/assets/images/bn-discounr.jpg"]};
        vm.fillForm();

        //temp

        function fillForm() {
            vm.itemList.image !== null ?
                vm.formImgTempUrl = vm.itemList.image.map(function (val) {
                    return val.replace(' ', '%20')
                }) : vm.formImgTempUrl = null;
        }

        BannerFactory.getItem(vm.token).then(function (res) {
            if (res.status === 'success') {
                vm.itemList = res.data;
                vm.fillForm();
            }
        });

        function updateList() {
            BannerFactory.getItem(vm.token).then(function (res) {
                if (res.status === 'success') {
                    vm.itemList = res.data;
                    vm.fillForm();
                }
            });
        }

        function editItem() {
            var fd = new FormData();
            fd.append("remember_token", vm.token);
            vm.formImg ? fd.append("image", vm.formImg[0]) : void(0);

            BannerFactory.editItem(fd).then(function (res) {
                if (res) {
                    toastr.info('Изменено')
                }
            });
        }
    }
})();
