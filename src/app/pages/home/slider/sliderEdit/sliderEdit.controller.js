/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('SliderEditCtrl', SliderEditCtrl);

    /** @ngInject */
    function SliderEditCtrl($scope, $filter, $state, toastr, baProgressModal, SliderFactory, dataService, ImgConfig) {
        var vm = this;
        vm.editItem = editItem;
        vm.goBack = goBack;
        vm.fillForm = fillForm;

        vm.formFilterSelected = {};
        vm.token = localStorage.getItem('token');
        vm.editObj = dataService.editID;
        vm.editObj === null ? $state.go("main.home.slider") : vm.fillForm();

        function fillForm() {
            vm.formTitle1 = vm.editObj.title_first;
            vm.formTitle2 = vm.editObj.title_second;
            vm.formLink = vm.editObj.link;
            vm.editObj.image !== null ?
                vm.formImgTempUrl = ImgConfig.slider + vm.editObj.image
                : vm.formImgTempUrl = null;
        }

        function editItem() {
            var fd = new FormData();
            fd.append("id", vm.editObj.id);
            fd.append("remember_token", vm.token);
            fd.append("title_first", vm.formTitle1);
            fd.append("title_second", vm.formTitle2);
            vm.formImg ? fd.append("image", vm.formImg[0]) : void(0);
            fd.append("link", vm.formLink);

            baProgressModal.open();
            SliderFactory.editItem(fd).then(function (res) {
                if (res) {
                    $state.go("main.home.slider");
                    baProgressModal.close();
                    toastr.info('Измененно')
                }
            }, function () {
                toastr.error('Неудача!');
                baProgressModal.close();
            });
        }

        function goBack() {
            $state.go("main.home.slider")
        }

    }

})();
